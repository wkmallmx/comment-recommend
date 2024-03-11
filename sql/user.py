from pyspark.sql import SparkSession
from pyspark.sql.functions import col, explode, split, year, sum, when, count, countDistinct, to_timestamp
from pyspark.sql.types import IntegerType, StructType, StructField, FloatType, StringType
from pyspark.sql.window import Window

# 创建SparkSession
spark = SparkSession.builder \
    .appName("Elite Users Analysis") \
    .getOrCreate()

# 读取数据时明确指定列的数据类型
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

user_path = 'yelp_academic_dataset_user.json'
df = spark.read.json(user_path, schema=schema)

# 1.分析每年加入的用户数量
df.withColumn("registration_year", year(to_timestamp("yelping_since")))\
    .groupBy("registration_year")\
    .count()\
    .orderBy("registration_year")\
    .coalesce(1)\
    .write\
    .json("1.json")

# 2.统计评论达人（review_count）
df.orderBy(col("review_count").desc())\
    .limit(20)\
    .select("name", "user_id", "review_count") \
    .coalesce(1) \
    .write\
    .json("2.json")

# 3.统计人气最高的用户（fans）
df.orderBy(col("fans").desc())\
    .limit(20)\
    .select("name", "user_id", "fans") \
    .coalesce(1) \
    .write\
    .json("3.json")


# 4.统计每年优质用户、普通用户比例
# 取注册年份
df = df.withColumn("registration_year", year(df["yelping_since"]))

# 根据elite字段拆分出每个年份，并统计每年的优质用户数量
elite_users = df.filter(col("elite") != "")\
                .withColumn("elite_year", explode(split(col("elite"), ","))) \
                .groupBy("elite_year")\
                .count() \
                .withColumnRenamed("count", "elite_count") \
                .orderBy("elite_year")

# 统计每年注册用户数量并进行累积计算
total_users = df.groupBy("registration_year")\
                .count() \
                .withColumnRenamed("count", "total_count") \
                .orderBy("registration_year")

# 添加累积注册用户数量列
total_users = total_users.withColumn("cumulative_total", sum("total_count")
                                     .over(Window.orderBy("registration_year").rowsBetween(Window.unboundedPreceding, 0)))

# 计算比例
users_ratio = elite_users.join(total_users,
                               elite_users["elite_year"] == total_users["registration_year"],
                               "outer") \
                        .fillna(0) \
                        .withColumn("elite_ratio", col("elite_count") / col("cumulative_total")) \
                        .orderBy("elite_year") \
                        .select("elite_year", "elite_count", "cumulative_total", "elite_ratio")
# 显示结果
users_ratio.show()
users_ratio.coalesce(1).write.json("4.json")

# 5.显示每年总用户数、沉默用户数（未写评论）的比例
review_df = spark.read.json("E:\yelp_academic_dataset_review.json")

# 计算每年注册用户数量
total_users_per_year = df.withColumn("registration_year", year("yelping_since")) \
    .groupBy("registration_year") \
    .agg(countDistinct("user_id").alias("total_users")) \
    .orderBy("registration_year")

# 计算每年发表评论的用户数
active_users_per_year = review_df.withColumn("review_year", year("date")) \
    .groupBy("review_year") \
    .agg(countDistinct("user_id").alias("active_users")) \
    .orderBy("review_year")

# 计算每年注册用户数量的累积值
cumulative_total_users = total_users_per_year.withColumn("cumulative_total",
                                                         sum("total_users")
                                                         .over(Window.orderBy("registration_year")
                                                         .rowsBetween(Window.unboundedPreceding, 0)))

# 计算每年沉默用户数（未发表评论的用户数）
silent_users_per_year = cumulative_total_users.join(active_users_per_year,
                                                    cumulative_total_users["registration_year"] == active_users_per_year["review_year"],
                                                    "left") \
                                              .withColumn("silent_users",
                                                          cumulative_total_users["cumulative_total"] - when(active_users_per_year["active_users"].isNull(), 0)
                                                                                                    .otherwise(active_users_per_year["active_users"]))

# 计算沉默用户数的比例
silent_users_ratio_per_year = silent_users_per_year.withColumn("silent_users_ratio",
                                                              silent_users_per_year["silent_users"] / silent_users_per_year["cumulative_total"])

# 按年份排序结果
silent_users_ratio_per_year.orderBy("registration_year").show()
silent_users_ratio_per_year.coalesce(1).write.json("5.json")

# 6.统计出每年的新用户数、评论数、精英用户、tip数、打卡数.
# 计算每年的评论数
reviews_per_year = review_df.withColumn("year", year("date")) \
                            .groupBy("year") \
                            .count() \
                            .orderBy("year")


reviews_per_year.coalesce(1).write.json("6.json")

# 优质用户
df = df.withColumn("registration_year", year(df["yelping_since"]))

# 根据elite字段拆分出每个年份，并统计每年的优质用户数量
elite_users = df.filter(col("elite") != "")\
                .withColumn("elite_year", explode(split(col("elite"), ","))) \
                .groupBy("elite_year")\
                .count() \
                .withColumnRenamed("count", "elite_count") \
                .orderBy("elite_year")
elite_users.coalesce(1).write.json("7.json")
from pyspark.sql.functions import split, explode

# 拆分elite字段中的字符串为单独的字符串数组，并转换为单独的行
elite_strings = df.withColumn("elite_array", split(col("elite"), ",")) \
                  .select(explode(col("elite_array")).alias("elite_string")) \
                  .distinct()

# 显示结果
elite_strings.show()

# 列出结果表格
# 列出结果折线图
# 阐述你对结果的洞察分析
# 执行时间

# 统计每年打卡数量
c_df = spark.read.json("yelp_academic_dataset_checkin.json")
# 拆分date字段中的日期字符串为单独的日期数组，并转换为单独的行
checkin_dates = c_df.withColumn("date_array", split(col("date"), ", ")) \
                  .select(explode(col("date_array")).alias("date_string")) \
                  .withColumn("year", year(to_timestamp(col("date_string"))))

# 根据年份进行分组，并统计每年的打卡数
checkin_count_per_year = checkin_dates.groupBy("year").count().orderBy("year")

# 显示结果
checkin_count_per_year.coalesce(1).write.json("8.json")
