import re
import string
import json
from collections import defaultdict

from nltk import word_tokenize
from pyspark.ml.feature import Tokenizer, RegexTokenizer, StopWordsRemover, NGram
from pyspark.sql import SparkSession, Window
from pyspark.sql.functions import col, expr, concat, countDistinct, to_timestamp, year, count, to_date, month, avg, \
    weekofyear, explode, collect_list, monotonically_increasing_id, udf
from pyspark.sql.types import StructType, ArrayType, StringType, StructField, IntegerType, BooleanType, FloatType
import pandas as pd
# Driver
spark = SparkSession \
    .builder \
    .master('local') \
    .appName('review') \
    .getOrCreate()

review_path = 'D:/yelp_sample.json'
df = spark.read.json(review_path)
df.printSchema()
df.show()


# review_df = df.select('text', 'stars')
# 去掉标点符号及空白
def remove_punct(text):
    regex = re.compile('[' + re.escape(string.punctuation) + '0-9\\r\\t\\n]')
    nopunct = regex.sub(" ", text)
    return nopunct


punct_remover = udf(lambda x: remove_punct(x))


review_df = df.select('text', 'stars')

# 去除标点符号及空白
clean_text_df = review_df.withColumn('clean_text', punct_remover('text'))\
    .drop('text')

import json
import numpy as np

# 读取json文件并加载数据
data = []
with open('1000.json', 'r') as f:
    for line in f:
        obj = json.loads(line.strip())
        data.append(obj)

# 按照cnt字段的值对json数据进行排序
sorted_data = sorted(data, key=lambda x: x['cnt'], reverse=True)

# 选择前N个最常见的单词构建词汇表，限制词汇表大小
top_n_words = 30
word_to_index = {word['word']: i for i, word in enumerate(sorted_data[:top_n_words])}

# 初始化全零矩阵
matrix_size = len(word_to_index)
matrix = np.zeros((matrix_size, matrix_size))


i = 0
# 遍历每一对单词
for word1 in word_to_index:
    index1 = word_to_index[word1]
    related_word = {'word': word1, 'related_words': []}
    for word2 in word_to_index:
        index2 = word_to_index[word2]
        if word1 != word2:
            # 遍历clean_text_df中的每一行
            for row in clean_text_df.collect():
                text = row['clean_text']
                # 检查这两个单词是否同时出现在同一行中
                if word1 in text and word2 in text:
                    # 如果是，则增加矩阵中相应位置的计数
                    matrix[index1][index2] += 1
            print(matrix[index1][index2])
            if matrix[index1][index2] > 500:
                related_word['related_words'].append(word2)
    with open('related_words.json', 'a+') as f:
        json.dump(related_word, f, indent=4)
    i += 1
    print(i)

# import json
#
# # 读取原始json文件并加载数据
# data = []
# with open('222.json', 'r') as f:
#     for line in f:
#         obj = json.loads(line.strip())
#         data.append(obj)
#
# # 筛选出cnt值大于5的元素
# filtered_data = [item for item in data if item['cnt'] >= 1000]
#
# # 按照cnt字段的值对筛选后的数据进行排序
# sorted_data = sorted(filtered_data, key=lambda x: x['cnt'], reverse=True)
#
# # 将排序后的数据写入新的json文件
# with open('1000.json', 'w') as outfile:
#     for item in sorted_data:
#         json.dump(item, outfile)
#         outfile.write('\n')
