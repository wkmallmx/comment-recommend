from common import route, ResMsg, ResponseCode
from extensions import sentiment_analysis
from flask import Flask, Blueprint, request


mood_bp = Blueprint('mood', __name__, url_prefix='/mood')


@route(mood_bp, '/analysis', methods=['POST'])
def get_mood_analysis():
    """
    获取情感分析结果
    :return:
    """
    # 获取前端数据
    data = request.get_json()
    bussiness_id = data.get('bussiness_id')
    # 进行情感分析
    sentiment_ma, neg, neu, pos = sentiment_analysis(bussiness_id)
    # 编辑返回消息
    res = ResMsg(code=ResponseCode.SUCCESS,
                 data={'sentiment_ma': sentiment_ma, 'neg': neg, 'neu': neu, 'pos': pos})
    # 返回结果
    return res
