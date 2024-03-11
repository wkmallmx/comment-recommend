from datetime import datetime
from pyspark.sql import SparkSession, Row
from pyspark.sql.functions import lit, monotonically_increasing_id

# 创建 SparkSession
spark = SparkSession \
    .builder \
    .master('local') \
    .appName('Business') \
    .getOrCreate()

# 指定 JSON 文件路径
business_path = 'yelp_academic_dataset_business.json'

# 读取 JSON 数据
business_df = spark.read.json(business_path)

from datetime import datetime


def check_current_time(schedule, current_time):
    if not schedule:  # 如果给出的是空字典，则一直在时间范围内
        return True

    current_weekday = current_time.strftime("%A")

    if current_weekday in schedule:
        opening_hours = schedule[current_weekday]

        if opening_hours is None:  # 添加检查，如果是None则返回False
            return False

        # 处理全天开门的情况
        if opening_hours == "0:00-0:00":
            return True

        start_time, end_time = opening_hours.split("-")
        start_hour, start_minute = map(int, start_time.split(":"))
        end_hour, end_minute = map(int, end_time.split(":"))

        # 检查当前时间是否在规定的时间范围内
        if (start_hour < current_time.hour < end_hour) or \
                (start_hour == current_time.hour and start_minute <= current_time.minute) or \
                (end_hour == current_time.hour and (current_time.minute < end_minute or (
                        current_time.minute == end_minute and current_time.second == 0))):
            return True

    return False


def check_business_hours(df_business):
    # 创建一个空列表用于存储结果
    is_open_now = []
    # 遍历数据中的每个 DataFrame
    for row in df_business.collect():
        hours = row['hours']
        current_time = datetime.now()
        result = check_current_time(hours, current_time)
        is_open_now.append(result)

    # 创建一个包含 is_open 列的 Row 对象列表
    rows = [Row(id=index, is_open_now=val) for index, val in enumerate(is_open_now)]
    # 转为dataframe
    is_open_df = spark.createDataFrame(rows)
    # 添加一个唯一标识列以便合并
    df_business = df_business.withColumn('id', monotonically_increasing_id())
    is_open_df = is_open_df.withColumn('id', monotonically_increasing_id())
    df_business = df_business.join(is_open_df, 'id', 'inner').drop('id')
    df_business.show()

check_business_hours(business_df)
