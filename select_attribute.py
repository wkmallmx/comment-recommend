from pyspark.sql import SparkSession
from pyspark.sql.functions import col, explode, split, desc
from pyspark.sql.functions import col

# 创建 SparkSession
spark = SparkSession \
    .builder \
    .master('local') \
    .appName('Business') \
    .getOrCreate()

business_path = 'yelp_academic_dataset_business.json'

business_df = spark.read.json(business_path)


def get_matching_attributes(business_id,  business_df):
    # 找到指定business_id对应的行
    target_business_df = business_df.filter(col("business_id") == business_id)
    # 如果找不到对应的行，返回空列表
    if target_business_df.count() == 0:
        return []

    target_business_attributes = target_business_df.select("attributes").collect()[0]
    if target_business_attributes.attributes is None:
        target_business_attributes_list = []
    else:
        target_business_attributes_string = target_business_attributes.attributes.asDict()

        target_business_attributes_list = []
        for i in target_business_attributes_string:
            if target_business_attributes_string[i] == "True":
                target_business_attributes_list.append(i)
        print(target_business_attributes_list)

    # 获取目标行的categories字段值，并拆分成单独的单词
    target_categories = target_business_df.select("categories").collect()[0][0]
    target_categories_words = target_categories.split(", ")

    business_with_categories = business_df.withColumn("category", explode(split(col("categories"), ", ")))

    # 对每个单词进行过滤，找出包含目标单词的商户行，并筛选stars字段大于4且review_count字段最多的5个商户
    matching_businesses = business_with_categories.filter(
        (col("category").isin(target_categories_words)) & (col("stars") > 4)
    ).orderBy(desc("review_count")).limit(10)

    matching_attributes = matching_businesses.select("attributes").collect()

    # 将属性字典提取为列表
    attributes_list = []
    for row in matching_attributes:
        if row.attributes:
            attributes_list.append(row.attributes.asDict())

    # print(attributes_list)
    result = []
    for attributes in attributes_list:
        if attributes is not None:
            for w in attributes:
                if attributes[w] == "True" and w not in result and w not in target_business_attributes_list:
                    result.append(w)
    return result



all_business_ids = business_df.select("business_id").rdd.flatMap(lambda x: x).collect()

# 逐个调用函数进行测试
for business_id in all_business_ids:
    attributes_list = get_matching_attributes(business_id, business_df)
    # 打印结果
    print(f"Business ID: {business_id}, Matching Attributes: {attributes_list}")
    print(f"Number of matching attributes: {len(attributes_list)}")