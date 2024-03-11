import re
import string
from collections import defaultdict

from nltk import word_tokenize
from pyspark.ml.feature import Tokenizer, RegexTokenizer, StopWordsRemover, NGram
from pyspark.sql import SparkSession, Window
from pyspark.sql.functions import col, expr, concat, countDistinct, to_timestamp, year, count, to_date, month, avg, \
    weekofyear, explode, collect_list, monotonically_increasing_id, udf, struct
from pyspark.sql.types import StructType, ArrayType, StringType, StructField, IntegerType, BooleanType, FloatType
import pandas as pd
from pyspark.sql.functions import year, count, max
# Driver
spark = SparkSession \
    .builder \
    .master('local') \
    .appName('review') \
    .getOrCreate()

review_path = 'E:/yelp_academic_dataset_review.json'
df = spark.read.json(review_path).cache()
df.printSchema()
df.show()

# 1. 从日期字段中提取年份
df = df.withColumn("year", year("date"))

# 2. 计算每个用户每年的评论数量
user_year_counts = df.groupBy("year", "user_id").agg(count("*").alias("num_reviews"))

# 3. 找到每一年评论数最多的用户
max_reviews_per_year = user_year_counts.groupBy("year").agg(max("num_reviews").alias("max_reviews"))
max_reviews_per_year_users = user_year_counts.join(max_reviews_per_year,
                                                   (user_year_counts["year"] == max_reviews_per_year["year"]) &
                                                   (user_year_counts["num_reviews"] == max_reviews_per_year["max_reviews"])) \
                                             .select(user_year_counts["year"],
                                                     user_year_counts["user_id"],
                                                     user_year_counts["num_reviews"].alias("max_reviews"))\
                                            .orderBy("year")

max_reviews_per_year_users.coalesce(1)\
                .write\
                .json("9.json")
max_reviews_per_year_users.show()



# 统计useful字段中不同类型值的数量
# 统计 'useful' 中各种类型值的数量
# df.groupBy('funny') \
#     .agg(count('funny').alias('count')) \
#     .orderBy('funny') \
#     .coalesce(1) \
#     .write\
#     .json("2.json")
#
#
# df.groupBy('cool') \
#     .agg(count('cool').alias('count')) \
#     .orderBy('cool') \
#     .coalesce(1) \
#     .write\
#     .json("4.json")
#
# # 显示统计结果
# useful_counts.show()


# review_df = df.select('text', 'stars')
# # 去掉标点符号及空白
# def remove_punct(text):
#     regex = re.compile('[' + re.escape(string.punctuation) + '0-9\\r\\t\\n]')
#     nopunct = regex.sub(" ", text)
#     return nopunct
#
#
# punct_remover = udf(lambda x: remove_punct(x))
#
#
# def process_data(df):
#     # 选择需要的列
#     review_df = df.select('text', 'stars')
#
#     # 去除标点符号及空白
#     clean_text_df = review_df.withColumn('clean_text', punct_remover('text')).drop('text')
#
#     # 分词
#     tokenizer = RegexTokenizer(inputCol='clean_text', outputCol='words', pattern='\\s+')
#     review_word_df = tokenizer.transform(clean_text_df)
#
#     # 去除停用词
#     remover = StopWordsRemover(inputCol='words', outputCol='words_clean')
#     review_word_nsw_df = remover.transform(review_word_df)
#
#     # 构建N-gram
#     ngram = NGram(inputCol='words_clean', outputCol='sentence', n=2)
#     ngram_review_df = ngram.transform(review_word_nsw_df)
#
#     # 统计词频
#     result_df = ngram_review_df.select(explode('sentence').alias('words')) \
#         .groupBy('words') \
#         .agg(count('words').alias('cnt'))
#
#     return result_df
#
#
#
# # # 导入额外的模块
# # from collections import defaultdict
# #
# # 定义函数以按批次处理数据
# def process_batch(review_path, batch_size=100000):
#
#     # 初始化偏移量
#     offset = 0
#
#     # 初始化全局词频字典
#     global_word_count = defaultdict(int)
#     i = 0
#     # 处理每个批次的数据
#     df = spark.read.json(review_path)
#     total_rows = df.count()
#     # 添加行索引
#     df = df.withColumn("row_index", monotonically_increasing_id())
#     while offset < total_rows:
#
#         # 根据偏移量和批次大小选择数据
#         df_batch = df.filter(f"row_index >= {offset}").filter(f"row_index < {offset + batch_size}")\
#             .filter(col("stars").cast("float") < 4)
#
#         result_df = process_data(df_batch)
#
#         # 更新偏移量
#         offset += batch_size
#         # 将每个批次的词频添加到全局词频字典中
#         for row in result_df.collect():
#             global_word_count[row['words']] += row['cnt']
#
#         # 清除缓存
#         # 清除内存
#         # spark.catalog.clearCache()
#
#         i += 1
#         print(f"Processed batch {i}")
#
#     # 将全局词频字典转换为 DataFrame
#     re_df = pd.DataFrame(global_word_count.items(), columns=["words ", "cnt"])
#
#     # 将结果保存为单个 JSON 文件
#     output_path = "555.json"
#     re_df.to_json(output_path, orient="records", lines=True)
#
#     # 显示保存路径
#     print(f"Results saved to {output_path}")
#
# # 数据文件路径
# review_path = 'E:\yelp_academic_dataset_review.json'
#
# # 按批次处理数据
# process_batch(review_path, batch_size=100000)




