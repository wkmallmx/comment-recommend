from pyspark.sql import SparkSession
from pyspark.sql.functions import col, expr, concat, countDistinct, to_timestamp, year, month, weekofyear, avg, count, to_date
from pyspark.sql.types import StructType, ArrayType, StringType, StructField, IntegerType, BooleanType, FloatType
 
# Driver
spark = SparkSession \
    .builder \
    .master('local') \
    .appName('HelloSpark') \
    .getOrCreate()
 
fire_schema = StructType([StructField("CallNumber", IntegerType(), True),
                          StructField("UnitID", StringType(), True),
                          StructField("IncidentNumber", IntegerType(), True),
                          StructField("CallType", StringType(), True),
                          StructField("CallDate", StringType(), True),
                          StructField("WatchDate", StringType(), True),
                          StructField("CallFinalDisposition", StringType(), True),
                          StructField("AvailableDtTm", StringType(), True),
                          StructField("Address", StringType(), True),
                          StructField("City", StringType(), True),
                          StructField("Zipcode", IntegerType(), True),
                          StructField("Battalion", StringType(), True),
                          StructField("StationArea", StringType(), True),
                          StructField("Box", StringType(), True),
                          StructField("OriginalPriority", StringType(), True),
                          StructField("Priority", StringType(), True),
                          StructField("FinalPriority", IntegerType(), True),
                          StructField("ALSUnit", BooleanType(), True),
                          StructField("CallTypeGroup", StringType(), True),
                          StructField("NumAlarms", IntegerType(), True),
                          StructField("UnitType", StringType(), True),
                          StructField("UnitSequenceInCallDispatch", IntegerType(), True),
                          StructField("FirePreventionDistrict", StringType(), True),
                          StructField("SupervisorDistrict", StringType(), True),
                          StructField("Neighborhood", StringType(), True),
                          StructField("Location", StringType(), True),
                          StructField("RowID", StringType(), True),
                          StructField("Delay", FloatType(), True)
                          ]
                         )
 
df = spark.read.option('header', True).schema(fire_schema).csv('sf-fire-calls.txt')


# 将CallDate列转换为日期类型
df = df.withColumn("CallDate", to_date(df["CallDate"], "dd/MM/yyyy"))

# 1. 打印2018年份所有的CallType，并去重
distinct_call_types_2018 = df.filter(year("CallDate") == 2018).select("CallType").distinct()
print("Distinct CallTypes in 2018:")
distinct_call_types_2018.show(truncate=False)

# 2. 2018年的哪个月份有最高的火警
most_fires_month_2018 = df.filter(year("CallDate") == 2018).groupby(month("CallDate").alias("Month")).agg(count("*").alias("TotalFires")).orderBy(col("TotalFires").desc()).first()
print(f"Month with the most fires in 2018: {most_fires_month_2018['Month']}")

# 3. San Francisco的哪个neighborhood在2018年发生的火灾次数最多？
most_fires_neighborhood_2018 = df.filter(year("CallDate") == 2018).groupby("Neighborhood").agg(count("*").alias("TotalFires")).orderBy(col("TotalFires").desc()).first()
print(f"Neighborhood with the most fires in 2018: {most_fires_neighborhood_2018['Neighborhood']}")

# 4. San Francisco的哪个neighborhood在2018年响应最慢？
slowest_response_neighborhood_2018 = df.filter(year("CallDate") == 2018).groupby("Neighborhood").agg(avg("Delay").alias("AverageResponseTime")).orderBy(col("AverageResponseTime").desc()).first()
print(f"Neighborhood with the slowest response time in 2018: {slowest_response_neighborhood_2018['Neighborhood']}")

# 5. 2018年的哪一周的火警次数最多
most_fires_week_2018 = df.filter(year("CallDate") == 2018).groupby(weekofyear("CallDate").alias("Week")).agg(count("*").alias("TotalFires")).orderBy(col("TotalFires").desc()).first()
print(f"Week with the most fires in 2018: {most_fires_week_2018['Week']}")

# 6. 数据集中任意值之间有关联（correlation）吗？
correlation_matrix = df.stat.corr("CallNumber", "IncidentNumber")
print(f"Correlation between CallNumber and IncidentNumber: {correlation_matrix}")

# 7. 使用parquet存储并读取
parquet_path = 'sf-fire-calls.parquet'
df.write.parquet(parquet_path, mode='overwrite')
parquet_df = spark.read.parquet(parquet_path)

# 关闭SparkSession
spark.stop()