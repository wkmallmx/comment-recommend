import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from pyspark.sql import SparkSession
def sentiment_analysis(business_id):
    spark = SparkSession.builder \
        .appName("Read JSON with PySpark") \
        .getOrCreate()
    df_review = spark.read.json("public/yelp_academic_dataset_bussiness.json") #改成json文件的地址
    filtered_df = df_review.filter(df_review.business_id == business_id)
    sorted_df = filtered_df.orderBy(filtered_df.date.asc())
    data = sorted_df.toPandas()
    nltk.download('vader_lexicon')
    analyzer = SentimentIntensityAnalyzer()
    sentiments = []
    neg = 0
    neu = 0
    pos = 0
    for i in range(len(data)):
        sentiment = analyzer.polarity_scores(data["text"][i])
        sentiments.append(sentiment["compound"])
        if (sentiment["compound"] >= 0.7):
            pos += 1
        elif (sentiment["compound"] >= 0.3 and sentiment["compound"] < 0.7):
            neu += 1
        else:
            neg += 1
    sentiment_ma=[]
    temp=0
    distance=30
    for i in range(distance,len(data)):
        for j in range(distance):
            sentiment = analyzer.polarity_scores(data["text"][i-j])
            temp+=sentiment["compound"]/distance
        sentiment_ma.append(temp)
        temp = 0
    return sentiment_ma,neg,neu,pos  #sentiment_ma是评论时间随时间变化的均线序列，neg是消极评论数，neu是中立评论数，pos是积极评论数
