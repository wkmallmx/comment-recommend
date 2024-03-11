from pyspark.sql import SparkSession, Window
from pyspark.sql.functions import col, year, count, sum, explode, split, hour, collect_list
import numpy as np
# Driver
spark = SparkSession \
    .builder \
    .master('local') \
    .appName('synthesis') \
    .getOrCreate()

business_path = 'yelp_academic_dataset_business.json'
checkin_path = 'yelp_academic_dataset_checkin.json'
b_df = spark.read.json(business_path)
c_df = spark.read.json(checkin_path)
# 将date列中的标签拆分为单独的行
exploded_c_df = c_df.withColumn("date", explode(split(col("date"), ", ")))
# exploded_c_df.show()

# 从business表中读取所需字段
selected_b_df = b_df.select("business_id", "review_count", "stars", "city")

check_count_df = exploded_c_df.groupBy("business_id")\
    .count()

merged_df = selected_b_df.join(check_count_df, "business_id", "left_outer")


def topsis(matrix, weights, impacts):
    """
    TOPSIS算法实现

    Parameters:
    - matrix: 二维数组，代表决策矩阵，每行表示一个方案，每列表示一个决策标准
    - weights: 一维数组，表示每个决策标准的权重，需与决策矩阵列数相同
    - impacts: 一维数组，表示每个决策标准的影响，1表示正向影响，-1表示负向影响，需与决策矩阵列数相同

    Returns:
    - 最好的五个方案的索引列表
    """
    # 标准化决策矩阵
    normalized_matrix = matrix / np.linalg.norm(matrix, axis=0)

    # 加权标准化决策矩阵
    weighted_normalized_matrix = normalized_matrix * weights

    # 计算正理想解和负理想解
    ideal_best = np.max(weighted_normalized_matrix, axis=0)
    ideal_worst = np.min(weighted_normalized_matrix, axis=0)

    # 计算方案与正理想解和负理想解的距离
    positive_distances = np.linalg.norm(weighted_normalized_matrix - ideal_best, axis=1)
    negative_distances = np.linalg.norm(weighted_normalized_matrix - ideal_worst, axis=1)

    # 计算综合评分
    scores = negative_distances / (positive_distances + negative_distances)

    # 找到综合评分最高的前五个方案的索引
    best_solution_indexes = np.argsort(scores)[::-1][:5]
    return best_solution_indexes

# 定义TOPSIS算法
# 定义TOPSIS算法
def topsis_for_city(matrix):
    # 从Pandas DataFrame转换为NumPy数组
    data_array = matrix[["review_count", "stars", "count"]].values

    # 权重
    weights = np.array([0.25, 0.25, 0.25])

    # 影响
    impacts = np.array([1, 1, 1])

    # 使用TOPSIS算法选择最优方案
    best_solution_index = topsis(data_array, weights, impacts)
    return best_solution_index

# 按照city进行分组，并对每个城市的数据应用TOPSIS算法
result = merged_df.groupBy("city").agg(*[collect_list(col(c)).alias(c) for c in merged_df.columns]).collect()

import json
# 创建一个空字典来存储城市及其对应的最佳商家名称列表
city_business_names_dict = {}

for row in result:
    city = row["city"]
    city_data = [row[c] for c in merged_df.columns]
    if not all(city_data):
        continue  # 如果城市数据为空，则跳过该城市的处理
    # 将城市数据转换为Pandas DataFrame
    city_df = spark.createDataFrame(list(zip(*city_data)), merged_df.columns)
    city_pandas_df = city_df.toPandas()
    # 使用TOPSIS算法计算最优方案索引
    best_solution_indexes = topsis_for_city(city_pandas_df)
    # 选择最优方案的business_id并打印前五个
    best_business_ids = city_pandas_df.loc[best_solution_indexes, "business_id"].tolist()
    # 创建一个空列表来存储每个商家的名称
    best_business_names = []

    # 遍历每个商家ID，并查找相应的商家名称
    for business_id in best_business_ids:
        # 使用过滤器筛选具有特定商家ID的行，并提取商家名称
        name = b_df.filter(col("business_id") == business_id).select("name").first()["name"]
        best_business_names.append(name)
        # 打印城市和对应的最佳商家名称列表
    print(f"City: {city}, Best Business Names: {best_business_names}")
    # 将城市及其对应的最佳商家名称列表添加到字典中
    city_business_names_dict[city] = best_business_names

# 将字典写入JSON文件
output_file_path = "city_best_business_names.json"
with open(output_file_path, "w") as f:
    json.dump(city_business_names_dict, f)

print(f"Data has been written to {output_file_path}")


# # 将business和checkin表连接起来
# joined_df = business_df.join(checkin_df, "business_id", "left_outer")
#
# # 选择所需的字段，并对城市进行分组
# joined_df.select("city", "business_id", "review_count", "stars", "count")\
#     .groupBy("city", "business_id")\
#     .agg({"review_count": "max", "stars": "max", "count": "max"})\
#     .show()