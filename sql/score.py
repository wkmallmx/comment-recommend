from pyspark.sql import SparkSession, Window
from pyspark.sql.functions import col, expr, concat, countDistinct, to_timestamp, year, count, to_date, month, avg, \
    weekofyear, explode, collect_list, monotonically_increasing_id, date_format
from pyspark.sql.types import StructType, ArrayType, StringType, StructField, IntegerType, BooleanType, FloatType
import pandas as pd
from pyspark.sql.functions import date_format, dayofweek
# Driver


class ScoreAnalysis:
    def __init__(self,review_path,business_path):

        self.review_path = review_path
        self.business_path = business_path
        self.spark = SparkSession \
                  .builder \
                  .master('local') \
                  .appName('score') \
                  .getOrCreate()
        self.review_df = self.spark.read.json(self.review_path)
        self.business_df = self.spark.read.json(self.business_path)

    # 1.统计评分的分布情况（1-5分）
    def analyze_rating_distribution(self):
        result_df = self.review_df.groupBy("stars").count() \
          .orderBy("stars") \

        return result_df

    # 2.统计评分周（周一~周天）次数统计
    def score_count_week(self):
        result_df = self.review_df.withColumn("date", to_timestamp("date", "yyyy-MM-dd HH:mm:ss"))\
            .withColumn("day_of_week", dayofweek("date"))\
            .groupBy("day_of_week")\
            .count()\
            .orderBy("day_of_week")

        return result_df
    # 3.统计拥有次数最多的5分评价的商家
    def max_count_business(self):
        result_df = self.review_df.filter(col("stars") == 5) \
            .groupBy("business_id") \
            .count() \
            .join(self.business_df.select("business_id", "name"), "business_id", "inner") \
            .orderBy("count", ascending=False)
        return result_df


def main():
    review_path = 'E:/yelp_academic_dataset_review.json'
    business_path = 'D:/PycharmProjects/comment-recommend/yelp_academic_dataset_business.json'

    analyzer = ScoreAnalysis(review_path, business_path)

    # 分析评分的分布情况
    rating_distribution = analyzer.analyze_rating_distribution()
    rating_distribution.show()

    # 统计评分周次数
    score_count_week = analyzer.score_count_week()
    score_count_week.show()

    # 统计拥有次数最多的5分评价的商家
    max_count_business = analyzer.max_count_business()
    max_count_business.show()


if __name__ == "__main__":
    main()
