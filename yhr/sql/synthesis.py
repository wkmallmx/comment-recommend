from pyspark.sql import SparkSession, Window
from pyspark.sql.functions import col, year, count, sum, explode, split, hour, collect_list
import numpy as np
import json

class YelpBusinessAnalyzer:
    def __init__(self, business_path, checkin_path):
        self.spark = SparkSession.builder.master('local').appName('synthesis').getOrCreate()
        self.business_path = business_path
        self.checkin_path = checkin_path

    def read_data(self):
        self.business_df = self.spark.read.json(self.business_path)
        self.checkin_df = self.spark.read.json(self.checkin_path)

    def process_data(self):
        # 将date列中的标签拆分为单独的行
        exploded_checkin_df = self.checkin_df.withColumn("date", explode(split(col("date"), ", ")))

        # 从business表中读取所需字段
        selected_business_df = self.business_df.select("business_id", "review_count", "stars", "city")

        # 按照business_id进行分组，并统计checkin次数
        checkin_count_df = exploded_checkin_df.groupBy("business_id").count()

        # 将商家数据与checkin次数合并
        self.merged_df = selected_business_df.join(checkin_count_df, "business_id", "left_outer")

    def topsis(self, matrix, weights, impacts):
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

    def topsis_for_city(self, city_df):
        # 从Pandas DataFrame转换为NumPy数组
        data_array = city_df[["review_count", "stars", "count"]].values

        # 权重
        weights = np.array([0.25, 0.25, 0.25])

        # 影响
        impacts = np.array([1, 1, 1])

        # 使用TOPSIS算法选择最优方案
        best_solution_index = self.topsis(data_array, weights, impacts)
        return best_solution_index

    def analyze(self):
        self.read_data()
        self.process_data()

        # 按照city进行分组，并对每个城市的数据应用TOPSIS算法
        city_groups = self.merged_df.groupBy("city").agg(*[collect_list(col(c)).alias(c) for c in self.merged_df.columns]).collect()

        city_business_names_dict = {}

        for row in city_groups:
            city = row["city"]
            city_data = [row[c] for c in self.merged_df.columns]
            if not all(city_data):
                continue
            city_df = self.spark.createDataFrame(list(zip(*city_data)), self.merged_df.columns)
            city_pandas_df = city_df.toPandas()
            best_solution_indexes = self.topsis_for_city(city_pandas_df)
            best_business_ids = city_pandas_df.loc[best_solution_indexes, "business_id"].tolist()
            best_business_names = []

            for business_id in best_business_ids:
                name = self.business_df.filter(col("business_id") == business_id).select("name").first()["name"]
                best_business_names.append(name)

            city_business_names_dict[city] = best_business_names

        output_file_path = "city_best_business_names.json"
        with open(output_file_path, "w") as f:
            json.dump(city_business_names_dict, f)

        print(f"Data has been written to {output_file_path}")


# Usage example
business_path = 'D:/PycharmProjects/comment-recommend/yelp_academic_dataset_business.json'
checkin_path = 'D:/PycharmProjects/comment-recommend/yelp_academic_dataset_checkin.json'
analyzer = YelpBusinessAnalyzer(business_path, checkin_path)
analyzer.analyze()
