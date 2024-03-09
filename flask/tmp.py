from application.extensions import sentiment_analysis

def test_sentiment_analysis():
    sentiment_ma,neg,neu,pos = sentiment_analysis("Pns2l4eNsfO8kk83dixA6A")
    print(sentiment_ma)
    print(f'Negative: {neg}')
    print(f'Neutral: {neu}')
    print(f'Positive: {pos}')