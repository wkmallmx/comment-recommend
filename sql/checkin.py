from pyspark.sql import SparkSession, Window
from pyspark.sql.functions import col, year, count, sum, explode, split, hour


class CheckinAnalyzer:
    def __init__(self, business_path, checkin_path):
        self.spark = SparkSession.builder \
            .master('local') \
            .appName('Checkin') \
            .getOrCreate()
        self.business_path = business_path
        self.checkin_path = checkin_path

    def load_dataframes(self):
        self.business_df = self.spark.read.json(self.business_path)
        self.checkin_df = self.spark.read.json(self.checkin_path)

    def explode_checkin_data(self):
        self.exploded_checkin_df = self.checkin_df.withColumn("date", explode(split(col("date"), ", ")))

    # 1.统计每年的打卡次数
    def yearly_checkin_count(self):
        window_spec = Window.partitionBy("business_id", "year")
        return self.exploded_checkin_df.withColumn("year", year(col("date"))) \
            .groupBy("year") \
            .agg(count("*").alias("yearly_checkin_count")) \
            .orderBy("year")

    # 2.统计24小时每小时打卡次数
    def hourly_checkin_count(self):
        window_spec = Window.partitionBy("hour")
        return self.exploded_checkin_df.withColumn("hour", hour(col("date"))) \
            .groupBy("hour") \
            .agg(count("*").alias("hourly_checkin_count")) \
            .orderBy("hour")

    # 3.统计最喜欢打卡的城市
    def favorite_checkin_city(self):
        window_spec = Window.partitionBy("city")
        return self.exploded_checkin_df.groupby("business_id") \
            .agg(count("*").alias("checkin_count")) \
            .join(self.business_df, self.checkin_df["business_id"] == self.business_df["business_id"], "inner") \
            .select("city", sum("checkin_count").over(window_spec).alias("total_checkin_count")) \
            .distinct() \
            .orderBy(col("total_checkin_count").desc())

    # 4.全部商家的打卡排行榜
    def business_checkin_ranking(self):
        return self.exploded_checkin_df.groupby("business_id") \
            .agg(count("*").alias("checkin_count")) \
            .orderBy(col("checkin_count").desc()) \
            .join(self.business_df, self.checkin_df["business_id"] == self.business_df["business_id"], "inner") \
            .select("name", "checkin_count")


# 示例使用：
business_path = 'D:/PycharmProjects/comment-recommend/yelp_academic_dataset_business.json'
checkin_path = 'D:/PycharmProjects/comment-recommend/yelp_academic_dataset_checkin.json'

analyzer = CheckinAnalyzer(business_path, checkin_path)
analyzer.load_dataframes()
analyzer.explode_checkin_data()
analyzer.yearly_checkin_count().show()
analyzer.hourly_checkin_count().show()
analyzer.favorite_checkin_city().show()
analyzer.business_checkin_ranking().show()
