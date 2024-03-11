from pyspark.sql import SparkSession
from pyspark.sql.functions import col, countDistinct, avg, count
from pyspark.sql.types import StringType, IntegerType


class BusinessAnalysis:
    def __init__(self, spark, business_path, review_path):
        self.spark = spark
        self.business_path = business_path
        self.review_path = review_path

    def load_business_data(self):
        self.business_df = self.spark.read.json(self.business_path)
        self.review_df = self.spark.read.json(self.review_path)

    def most_common_businesses(self):
        result = self.business_df.groupBy("name")\
            .count()\
            .orderBy(col("count").desc()) \
            .select("name", col("count")) \
            .limit(20)
        return result

    def most_business_cities(self):
        result = self.business_df.groupBy("city") \
            .count() \
            .orderBy(col("count").desc()) \
            .limit(10)
        return result

    def most_business_states(self):
        result = self.business_df.groupby("state") \
            .count() \
            .orderBy(col("count").desc()) \
            .limit(5)
        return result

    from pyspark.sql.functions import count
    def most_common_businesses_with_avg_stars(self):
        result = self.business_df.groupBy("name") \
            .agg(count("name").alias("count"), avg("stars").alias("avg_stars")) \
            .orderBy(col("count").desc()) \
            .select("name", "count", "avg_stars") \
            .limit(20)
        return result

    def highest_rated_cities(self):
        result = self.business_df.groupBy("city") \
            .agg(avg("stars").alias("avg_stars")) \
            .orderBy(col("avg_stars").desc()) \
            .limit(10)
        return result

    def total_categories_count(self):
        result = self.business_df.select(countDistinct("categories")).collect()[0][0]
        return result

    def most_common_categories(self):
        result = self.business_df.groupby("categories") \
            .count() \
            .orderBy(col("count").desc()) \
            .select("categories", col("count")) \
            .limit(10)
        return result

    def highest_rated_businesses(self):
        result = self.business_df.filter(col("stars") == 5) \
            .join(self.review_df, "business_id", "inner") \
            .groupBy("name").count() \
            .orderBy(col("count").desc()) \
            .limit(20)
        return result

    def count_restaurants(self):
        result = self.business_df.filter(col("categories").contains("Restaurants") & col("categories").contains("American")) \
            .count()
        return result

    def count_comments(self):
        result = self.business_df.join(self.review_df, "business_id", "inner") \
            .filter(col("categories").contains("Restaurant") & col("categories").contains("American")) \
            .count()
        return result

    def rating_distribution(self):
        result = self.business_df.filter(col("categories").contains("Restaurant") & col("categories").contains("American")) \
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

    business_path = 'yelp_academic_dataset_business.json'
    review_path = 'E:\yelp_academic_dataset_review.json'

    analysis = BusinessAnalysis(spark, business_path, review_path)
    analysis.load_business_data()

    most_common_businesses_result = analysis.most_common_businesses()
    most_business_cities_result = analysis.most_business_cities()
    most_business_states_result = analysis.most_business_states()


