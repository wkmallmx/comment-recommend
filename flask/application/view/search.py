from flask import Flask, Blueprint, request
from application.common import route, ResMsg, ResponseCode
from application.extensions import db
from application.models import User
from application.extensions.requirment2.search import Search_Recommend_Module
import pandas as pd

search_bp = Blueprint('search', __name__, url_prefix='/search')

post_data_example = {
    "username": "admin",
    "search_text": "restaurants"
}

response_data_example = {
    "businesses": [
        {
            "business_id": "123",
            "name": "restaurant1",
            "distance": 0.5,
            "latitude": 123.123,
            "longitude": 123.123
        },
        {
            "business_id": "124",
            "name": "restaurant2",
            "distance": 0.6,
            "latitude": 123.123,
            "longitude": 123.123
        }

    ]

}

# 前端发回用户名,查询字段，后端查询用户位置，返回搜索结果


@route(search_bp, '/business', methods=['GET', 'POST'])
def get_search_business():
    if request.method == 'GET':
        res = ResMsg(code=ResponseCode.SUCCESS, data=response_data_example)
        return res.data
    else:
        user = db.session.query(User).filter(
            User.username == request.form['username']).first()
        latitude = user.latitude
        longitude = user.longitude
        search_text = request.form['search_text']
        search_module = Search_Recommend_Module()
        res = search_module.search_business(
            latitude, longitude, search_text, limit_distance=10, user_id=user.id)
        res = res[['business_id', 'name', 'distance', 'latitude', 'longitude']]
        print(res)
        # 转换为json格式
        res = res.to_json(orient='records')
        response = ResMsg(code=ResponseCode.SUCCESS, data=res)
    return response.data


@route(search_bp, '/user', methods=['GET','POST'])
def get_search_user():
    if request.method == 'GET':
        return {"message": "search user"}, 200
    else:
        user = db.session.query(User).filter(
            User.username == request.form['username']).first()
        latitude = user.latitude
        longitude = user.longitude
        search_module = Search_Recommend_Module()
        res = search_module.search_user(
            latitude, longitude, search_text=request.form['search_text'],user_id=user.id, limit_distance=10)
        res = res.to_json(orient='records')
        response = ResMsg(code=ResponseCode.SUCCESS, data=res)
        return response.data