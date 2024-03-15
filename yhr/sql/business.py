from pyspark.sql import SparkSession
from pyspark.sql.functions import col, countDistinct, avg, count
from pyspark.sql.types import StringType, IntegerType


class BusinessAnalysis:
    def __init__(self, spark, business_path, review_path):
        self.spark = spark
        self.business_path = business_path
        self.review_path = review_path

    def load_data(self):
        self.business_df = self.spark.read.json(self.business_path)
        self.review_df = self.spark.read.json(self.review_path)

    # 1.找出美国最常见商户(前二十)
    def most_common_businesses(self):
        result = self.business_df.groupBy("name") \
            .count() \
            .orderBy(col("count").desc()) \
            .select("name", col("count")) \
            .limit(20)
        return result

    # 2.找出美国商户最多的前10个城市
    def most_business_cities(self):
        result = self.business_df.groupBy("city") \
            .count() \
            .orderBy(col("count").desc()) \
            .limit(10)
        return result

    # 3.找出美国商户最多的前5个州
    def most_business_states(self):
        result = self.business_df.groupby("state") \
            .count() \
            .orderBy(col("count").desc()) \
            .limit(5)
        return result

    # 4.找出美国最常见商户，并显示平均评分(前20)
    def most_common_businesses_with_avg_stars(self):
        result = self.business_df.groupBy("name") \
            .agg(count("name").alias("count"), avg("stars").alias("avg_stars")) \
            .orderBy(col("count").desc()) \
            .select("name", "count", "avg_stars") \
            .limit(20)
        return result

    # 5.统计评分最高的城市（前10）
    def highest_rated_cities(self):
        result = self.business_df.groupBy("city") \
            .agg(avg("stars").alias("avg_stars")) \
            .orderBy(col("avg_stars").desc()) \
            .limit(10)
        return result

    # 6.统计category的数量
    def total_categories_count(self):
        result = self.business_df.select(countDistinct("categories")).collect()[0][0]
        return result

    # 7.统计最多的category及数量(前10)
    def most_common_categories(self):
        result = self.business_df.groupby("categories") \
            .count() \
            .orderBy(col("count").desc()) \
            .select("categories", col("count")) \
            .limit(10)
        return result

    # 8.收获五星评论最多的商户(前20)
    def highest_rated_businesses(self):
        result = self.business_df.filter(col("stars") == 5) \
            .join(self.review_df, "business_id", "inner") \
            .groupBy("name").count() \
            .orderBy(col("count").desc()) \
            .limit(20)
        return result

    # 统计不同类型（中国菜、美式、墨西哥）的餐厅类型及数量
    def count_restaurants(self):
        result = self.business_df.filter(
            col("categories").contains("Restaurants") & col("categories").contains("American")) \
            .count()
        return result

    # 10.计不同类型(中国菜、美式、墨西哥)的餐厅的评论数量
    def count_comments(self):
        result = self.business_df.join(self.review_df, "business_id", "inner") \
            .filter(col("categories").contains("Restaurant") & col("categories").contains("American")) \
            .count()
        return result

    # 11.统计不同类型（中国菜、美式、墨西哥）的餐厅的评分分布
    def rating_distribution(self):
        result = self.business_df.filter(
            col("categories").contains("Restaurant") & col("categories").contains("American")) \
            .groupBy("stars") \
            .count() \
            .orderBy("stars")
        return result


# Example usage:
if __name__ == "__main__":
    spark = SparkSession \
        .builder \
        .master('local') \
        .appName('Business') \
        .getOrCreate()

    business_path = 'D:/PycharmProjects/comment-recommend/yelp_academic_dataset_business.json'
    review_path = 'E:\yelp_academic_dataset_review.json'

    analysis = BusinessAnalysis(spark, business_path, review_path)
    analysis.load_data()

    most_common_businesses_result = analysis.most_common_businesses()
    most_common_businesses_result.show()
    most_business_cities_result = analysis.most_business_cities()
    most_business_cities_result.show()
    most_business_states_result = analysis.most_business_states()
    most_business_states_result.show()