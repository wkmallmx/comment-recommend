from pyspark.sql import SparkSession, Window
from pyspark.sql.functions import col, year, count, sum, explode, split, hour

# Driver
spark = SparkSession \
    .builder \
    .master('local') \
    .appName('Checkin') \
    .getOrCreate()

business_path = 'yelp_academic_dataset_business.json'
checkin_path = 'yelp_academic_dataset_checkin.json'
b_df = spark.read.json(business_path)
c_df = spark.read.json(checkin_path)
# 将date列中的标签拆分为单独的行
exploded_c_df = c_df.withColumn("date", explode(split(col("date"), ", ")))
exploded_c_df.show()

# # 示例数据
# data = [
#     ("user1", "2020-03-13 21:10:56"),
#     ("user1", "2020-06-02 14:18:06"),
#     ("user1", "2021-06-02 14:18:06"),
#     ("user1", "2020-06-02 15:18:06"),
#     ("user1", "2022-06-02 18:18:06"),
#     ("user1", "2021-06-02 21:18:06"),
#     ("user1", "2021-06-02 20:18:06"),
#     ("user2", "2010-06-02 20:18:06"),
#     ("user2", "2020-06-02 18:18:06"),
#     ("user2", "2010-06-02 18:18:06"),
#     ("user2", "2011-06-02 17:18:06"),
#     ("user2", "2011-06-02 18:18:06"),
#     ("user2", "2011-06-02 15:18:06"),
#     # 添加更多数据...
# ]
# # 创建 DataFrame
# exploded_c_df = spark.createDataFrame(data, ["business_id", "date"])

#
# # 统计每年的打卡次数
# window_spec = Window.partitionBy("business_id","year")
# exploded_c_df.withColumn("year", year(col("date"))) \
#     .groupBy("year") \
#     .agg(count("*").alias("yearly_checkin_count")) \
#     .orderBy("year")\
#     .coalesce(1)\
#     .write.json("1.json")
#
# # 统计24小时每小时打卡次数
# window_spec = Window.partitionBy("hour")
# exploded_c_df.withColumn("hour", hour(col("date"))) \
#     .groupBy("hour") \
#     .agg(count("*").alias("hourly_checkin_count")) \
#     .orderBy("hour") \
#     .coalesce(1) \
#     .write.json("2.json")

# # 统计最喜欢打卡的城市
# window_spec = Window.partitionBy("city")
# exploded_c_df.groupby("business_id")\
#     .agg(count("*").alias("checkin_count"))\
#     .join(b_df, c_df["business_id"] == b_df["business_id"] ,"inner")\
#     .select("city",sum("checkin_count").over(window_spec).alias("total_checkin_count"))\
#     .distinct()\
#     .orderBy(col("total_checkin_count").desc()) \
#     .coalesce(1) \
#     .write.json("3.json")

# 全部商家的打卡排行榜
exploded_c_df.groupby("business_id")\
    .agg(count("*").alias("checkin_count"))\
    .orderBy(col("checkin_count").desc())\
    .join(b_df, c_df["business_id"] == b_df["business_id"] ,"inner")\
    .select("name","checkin_count") \
    .coalesce(1) \
    .write.json("4.json")



