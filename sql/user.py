from pyspark.sql import SparkSession
from pyspark.sql.functions import col, explode, split, year, sum, when, count, countDistinct, to_timestamp
from pyspark.sql.types import IntegerType, StructType, StructField, FloatType, StringType
from pyspark.sql.window import Window

class YelpDataAnalyzer:
    def __init__(self, user_path, review_path, checkin_path):
        self.spark = SparkSession.builder \
            .appName("Yelp Data Analysis") \
            .getOrCreate()
        self.user_path = user_path
        self.review_path = review_path
        self.checkin_path = checkin_path

    def load_dataframes(self):
        schema = StructType([
            StructField("average_stars", FloatType(), True),
            StructField("compliment_cool", IntegerType(), True),
            StructField("compliment_cute", IntegerType(), True),
            StructField("compliment_funny", IntegerType(), True),
            StructField("compliment_hot", IntegerType(), True),
            StructField("compliment_list", IntegerType(), True),
            StructField("compliment_more", IntegerType(), True),
            StructField("compliment_note", IntegerType(), True),
            StructField("compliment_photos", IntegerType(), True),
            StructField("compliment_plain", IntegerType(), True),
            StructField("compliment_profile", IntegerType(), True),
            StructField("compliment_writer", IntegerType(), True),
            StructField("cool", IntegerType(), True),
            StructField("elite", StringType(), True),
            StructField("fans", IntegerType(), True),
            StructField("friends", StringType(), True),
            StructField("funny", IntegerType(), True),
            StructField("name", StringType(), True),
            StructField("review_count", IntegerType(), True),
            StructField("useful", IntegerType(), True),
            StructField("user_id", StringType(), True),
            StructField("yelping_since", StringType(), True)
        ])

        self.user_df = self.spark.read.json(self.user_path, schema=schema)
        self.review_df = self.spark.read.json(self.review_path)
        self.checkin_df = self.spark.read.json(self.checkin_path)
        self.user_df = self.user_df.withColumn("registration_year", year(to_timestamp("yelping_since")))

    # 1. 分析每年加入的用户数量
    def analyze_registration_per_year(self):
        return self.user_df.withColumn("registration_year", year(to_timestamp("yelping_since"))) \
                                            .groupBy("registration_year") \
                                            .count() \
                                            .orderBy("registration_year")

    # 2.统计评论达人（review_count）
    def analyze_top_reviewers(self):
        return self.user_df.orderBy(col("review_count").desc()) \
                                    .limit(20) \
                                    .select("name", "user_id", "review_count")

    # 3.统计人气最高的用户（fans）
    def analyze_popular_users(self):
        return self.user_df.orderBy(col("fans").desc()) \
                                    .limit(20) \
                                    .select("name", "user_id", "fans")

    # 4.统计每年优质用户、普通用户比例
    def analyze_elite_ratio_per_year(self):

        elite_users = self.user_df.withColumn("registration_year", year("yelping_since")) \
                                  .filter(col("elite") != "") \
                                  .withColumn("elite_year", explode(split(col("elite"), ","))) \
                                  .groupBy("elite_year") \
                                  .count() \
                                  .withColumnRenamed("count", "elite_count") \
                                  .orderBy("elite_year")

        total_users = self.user_df.groupBy("registration_year") \
                                  .count() \
                                  .withColumnRenamed("count", "total_count") \
                                  .orderBy("registration_year") \
                                  .withColumn("cumulative_total", sum("total_count")
                                              .over(Window.orderBy("registration_year").rowsBetween(Window.unboundedPreceding, 0)))

        return elite_users.join(total_users,
                                                 elite_users["elite_year"] == total_users["registration_year"],
                                                 "outer") \
                                           .fillna(0) \
                                           .withColumn("elite_ratio", col("elite_count") / col("cumulative_total")) \
                                           .orderBy("elite_year") \
                                           .select("elite_year", "elite_count", "cumulative_total", "elite_ratio")

    # 5.显示每年总用户数、沉默用户数（未写评论）的比例
    def analyze_silent_users_ratio_per_year(self):
        total_users_per_year = self.user_df.withColumn("registration_year", year("yelping_since")) \
                                           .groupBy("registration_year") \
                                           .agg(countDistinct("user_id").alias("total_users")) \
                                           .orderBy("registration_year")

        active_users_per_year = self.review_df.withColumn("review_year", year("date")) \
                                              .groupBy("review_year") \
                                              .agg(countDistinct("user_id").alias("active_users")) \
                                              .orderBy("review_year")

        cumulative_total_users = total_users_per_year.withColumn("cumulative_total",
                                                                  sum("total_users")
                                                                  .over(Window.orderBy("registration_year")
                                                                  .rowsBetween(Window.unboundedPreceding, 0)))

        silent_users_per_year = cumulative_total_users.join(active_users_per_year,
                                                             cumulative_total_users["registration_year"] == active_users_per_year["review_year"],
                                                             "left") \
                                                       .withColumn("silent_users",
                                                                   cumulative_total_users["cumulative_total"] - when(active_users_per_year["active_users"].isNull(), 0)
                                                                                                             .otherwise(active_users_per_year["active_users"]))

        return silent_users_per_year.withColumn("silent_users_ratio",
                                                                       silent_users_per_year["silent_users"] / silent_users_per_year["cumulative_total"])


    # 统计评论数
    def analyze_reviews_per_year(self):
        return self.review_df.withColumn("year", year("date")) \
                                         .groupBy("year") \
                                         .count() \
                                         .orderBy("year")

    # 统精英用户数
    def analyze_elite_users_per_year(self, output_path):
        return self.user_df.withColumn("registration_year", year("yelping_since")) \
                                           .filter(col("elite") != "") \
                                           .withColumn("elite_year", explode(split(col("elite"), ","))) \
                                           .groupBy("elite_year") \
                                           .count() \
                                           .withColumnRenamed("count", "elite_count") \
                                           .orderBy("elite_year")

    # 统计打卡数
    def analyze_checkins_per_year(self, output_path):
        checkin_dates = self.checkin_df.withColumn("date_array", split(col("date"), ", ")) \
                                       .select(explode(col("date_array")).alias("date_string")) \
                                       .withColumn("year", year(to_timestamp(col("date_string"))))

        return checkin_dates.groupBy("year")\
            .count()\
            .orderBy("year")



def main():
    user_path = 'D:/PycharmProjects/comment-recommend/yelp_academic_dataset_user.json'
    review_path = 'E:/yelp_academic_dataset_review.json'
    checkin_path = 'D:/PycharmProjects/comment-recommend/yelp_academic_dataset_checkin.json'

    analyzer = YelpDataAnalyzer(user_path, review_path, checkin_path)
    analyzer.load_dataframes()

    # 分析每年加入的用户数量
    analyzer.analyze_registration_per_year().show()

    # 分析评论达人
    analyzer.analyze_top_reviewers().show()

    # 分析人气最高的用户
    analyzer.analyze_popular_users().show()

    # 统计每年优质用户、普通用户比例
    analyzer.analyze_elite_ratio_per_year().show()

    # 显示每年总用户数、沉默用户数（未写评论）的比例
    analyzer.analyze_silent_users_ratio_per_year().show()

    # 统计每年的新用户数、评论数、精英用户、tip数、打卡数
    analyzer.analyze_reviews_per_year().show()
    analyzer.analyze_elite_users_per_year().show()
    analyzer.analyze_checkins_per_year().show()


if __name__ == "__main__":
    main()
