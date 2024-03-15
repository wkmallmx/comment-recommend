import json
import re
import string
from collections import defaultdict

import numpy as np
import pandas as pd
from pyspark.ml.feature import Tokenizer, RegexTokenizer, StopWordsRemover, NGram
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, explode, count, udf
from pyspark.sql.functions import monotonically_increasing_id
from pyspark.sql.functions import year
from pyspark.sql.functions import max
from pyspark.sql.types import StringType


class YelpReviewProcessor:
    def __init__(self, review_path):
        self.spark = SparkSession\
            .builder\
            .master('local')\
            .appName('review')\
            .getOrCreate()
        self.review_path = review_path

    # 读取数据
    def read_data(self, review_path):
        self.review_df = self.spark.read.json(self.review_path)

    # 2.统计有用（helpful）、有趣（funny）及酷（cool）的评论及数量
    def count_field_values(self, field):
        # 统计字段中不同类型值的数量
        return self.review_df.groupBy(field) \
            .agg(count(field).alias('count')) \
            .orderBy(field)

    # 3.每年全部评论用户排行榜
    def rank_year_user(self):
        # 从日期字段中提取年份
        df = self.review_df.withColumn("year", year("date"))

        # 计算每个用户每年的评论数量
        user_year_counts = df.groupBy("year", "user_id").agg(count("*").alias("num_reviews"))

        # 1. 找到每一年评论数最多的用户
        max_reviews_per_year = user_year_counts.groupBy("year")\
            .agg(max("num_reviews").alias("max_reviews"))
        return user_year_counts.join(max_reviews_per_year,
                                                           (user_year_counts["year"] == max_reviews_per_year["year"]) &
                                                           (user_year_counts["num_reviews"] == max_reviews_per_year[
                                                               "max_reviews"])) \
            .select(user_year_counts["year"],
                    user_year_counts["user_id"],
                    user_year_counts["num_reviews"].alias("max_reviews")) \
            .orderBy("year")

    # 处理数据
    def process_data(self):
        # 选择需要的列
        review_df = self.review_df.select('text', 'stars')

        # 去除标点符号及空白
        def remove_punc(text):
            regex = re.compile('[' + re.escape(string.punctuation) + '0-9\\r\\t\\n]')
            nopunct = regex.sub(" ", text)
            return nopunct

        punct_remover = udf(lambda x: remove_punc(x))

        clean_text_df = review_df.withColumn('clean_text', punct_remover('text')).drop('text')

        # 分词
        tokenizer = RegexTokenizer(inputCol='clean_text', outputCol='words', pattern='\\s+')
        review_word_df = tokenizer.transform(clean_text_df)

        # 去除停用词
        remover = StopWordsRemover(inputCol='words', outputCol='words_clean')
        review_word_nsw_df = remover.transform(review_word_df)

        # 构建N-gram
        ngram = NGram(inputCol='words_clean', outputCol='sentence', n=2)
        ngram_review_df = ngram.transform(review_word_nsw_df)

        # 统计词频
        result_df = ngram_review_df.select(explode('sentence').alias('words')) \
            .groupBy('words') \
            .agg(count('words').alias('cnt'))

        return result_df

    # 4.从评论中提取最常见的Top20词语
    def process_batch(self, review_path, batch_size=100000):
        # 初始化偏移量
        offset = 0

        # 初始化全局词频字典
        global_word_count = defaultdict(int)
        i = 0
        # 处理每个批次的数据
        df = self.spark.read.json(review_path)
        total_rows = df.count()
        # 添加行索引
        df = df.withColumn("row_index", monotonically_increasing_id())
        while offset < total_rows:
            # 根据偏移量和批次大小选择数据
            df_batch = df.filter(f"row_index >= {offset}") \
                .filter(f"row_index < {offset + batch_size}") \
                .filter(col("stars").cast("float") < 4)

            result_df = self.process_data(df_batch)

            # 更新偏移量
            offset += batch_size
            # 将每个批次的词频添加到全局词频字典中
            for row in result_df.collect():
                global_word_count[row['words']] += row['cnt']

            i += 1
            print(f"Processed batch {i}")

        # 将全局词频字典转换为 DataFrame
        re_df = pd.DataFrame(global_word_count.items(), columns=["words", "cnt"])

        # 将结果保存为单个 JSON 文件
        output_path = "yelp_review_results.json"
        re_df.to_json(output_path, orient="records", lines=True)

        # 显示保存路径
        print(f"Results saved to {output_path}")

    def remove_punct(self, text):
        regex = re.compile('[' + re.escape(string.punctuation) + '0-9\\r\\t\\n]')
        return regex.sub(" ", text)

    def preprocess_text(self):
        remove_punct_udf = udf(self.remove_punct, StringType())
        return self.review_df.withColumn('clean_text', remove_punct_udf(col('text')))

    def process_related_words(self, top_n_words=30, threshold=500):
        review_df = self.preprocess_text().select('clean_text')

        # Tokenize
        tokenizer = Tokenizer(inputCol="clean_text", outputCol="words")
        words_df = tokenizer.transform(review_df)

        # Get top N words
        word_counts = words_df.select(explode("words").alias("word")) \
            .groupBy("word") \
            .count() \
            .orderBy(col("count").desc()) \
            .limit(top_n_words)

        # Collect top N words into a list
        top_words = [row["word"] for row in word_counts.collect()]

        # Create word-to-index mapping
        word_to_index = {word: i for i, word in enumerate(top_words)}

        # Initialize matrix
        matrix_size = len(word_to_index)
        matrix = np.zeros((matrix_size, matrix_size))

        # Compute co-occurrence matrix
        for word1 in word_to_index:
            index1 = word_to_index[word1]
            for word2 in word_to_index:
                index2 = word_to_index[word2]
                if word1 != word2:
                    for row in words_df.collect():
                        text = row['clean_text']
                        if word1 in text and word2 in text:
                            matrix[index1][index2] += 1

        # Find related words based on threshold
        related_words = defaultdict(list)
        for word1, index1 in word_to_index.items():
            for word2, index2 in word_to_index.items():
                if word1 != word2 and matrix[index1][index2] > threshold:
                    related_words[word1].append(word2)

        # Save related words to JSON
        with open('related_words.json', 'w') as f:
            json.dump(related_words, f, indent=4)


# 创建 YelpReviewProcessor 实例
review_path = 'E:/yelp_academic_dataset_review.json'
processor = YelpReviewProcessor(review_path)

# 读取数据
processor.read_data(review_path)

# 统计字段中不同类型值的数量
helpful_count = processor.count_field_values('useful')
funny_count = processor.count_field_values('funny')
cool_count = processor.count_field_values('cool')

# 打印统计结果
print("Helpful Count:")
helpful_count.show()

print("Funny Count:")
funny_count.show()

print("Cool Count:")
cool_count.show()

# 每年全部评论用户排行榜
user_rank = processor.rank_year_user()
user_rank.show()

# 处理数据并保存结果
processed_data = processor.process_data()
processed_data.show()

# 批量处理数据
processor.process_batch(review_path, batch_size=100000)


