from pyspark.sql import SparkSession, Window
from pyspark.sql.functions import col, expr, concat, countDistinct, to_timestamp, year, count, to_date, month, avg, \
    weekofyear, explode, collect_list, monotonically_increasing_id, date_format
from pyspark.sql.types import StructType, ArrayType, StringType, StructField, IntegerType, BooleanType, FloatType
import pandas as pd
from pyspark.sql.functions import date_format, dayofweek
# Driver
spark = SparkSession \
    .builder \
    .master('local') \
    .appName('score') \
    .getOrCreate()



class ScoreAnalysis:
    def __init__(self, spark, review_path,business_path):

        self.review_path = review_path
        self.business_path = business_path
        self.spark = spark
        self.review_df = self.spark.read.json(self.revew_path)
        self.business_df = self.spark.read.json(self.business_df)

    def analyze_rating_distribution(self):
        result_df = self.review_df.groupBy("stars").count() \
          .orderBy("stars") \

        return result_df

    def score_count_week(self):
        result_df = self.review_df.withColumn("date", to_timestamp("date", "yyyy-MM-dd HH:mm:ss"))\
            .withColumn("day_of_week", dayofweek("date"))\
            .groupBy("day_of_week")\
            .count()\
            .orderBy("day_of_week")

        return result_df

    def max_count_bussiness(self):
        result_df = self.df.filter(col("stars") == 5)\
                .groupBy("business_id")\
                .count()\
                .join(self.business_df.select("business_id", "name"), "business_id", "inner")\
                .orderBy("count", ascending=False)
        return result_df

