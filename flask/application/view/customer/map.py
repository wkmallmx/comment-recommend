from flask import Flask, Blueprint, request
from application.common import route, ResMsg, ResponseCode
from application.extensions import db
from application.models import User
from application.extensions.requirment2.search import Search_Recommend_Module
import pandas as pd

map_bp = Blueprint('map', __name__, url_prefix='/map')

post_data_example = {
    "username": "admin",
    "search_text": "restaurants"
}

response_data_example = {
    "businesses": [
        {"business_id": "1",
         "name": "restaurant1",
         "latitude": 1,
         "longitude": 1},
        {"business_id": "2",
         "name": "restaurant2",
         "latitude": 2,
         "longitude": 2},
        {"business_id": "3",
         "name": "restaurant3",
         "latitude": 3,
         "longitude": 3},
        {"business_id": "4",
         "name": "restaurant4",
         "latitude": 4,
         "longitude": 4},
        {"business_id": "5",
         "name": "restaurant5",
         "latitude": 5,
         "longitude": 5},
        {"business_id": "6",
         "name": "restaurant6",
         "latitude": 6,
         "longitude": 6},
        {"business_id": "7",
         "name": "restaurant7",
         "latitude": 7,
         "longitude": 7},
        {"business_id": "8",
         "name": "restaurant8",
         "latitude": 8,
         "longitude": 8},
        {"business_id": "9",
         "name": "restaurant9",
         "latitude": 9,
         "longitude": 9},
        {"business_id": "10",
         "name": "restaurant10",
         "latitude": 10,
         "longitude": 10}
    ]

}

# 前端发回用户名,查询字段，后端查询用户位置，返回附近的商店


@route(map_bp, '/sql', methods=['GET', 'POST'])
def get_nearby_shops_sql():
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
            latitude, longitude, search_text, limit_distance=70, user_id=user.id)
        res = res[['business_id', 'name', 'latitude', 'longitude']]
        # 转换为json格式
        res = res.to_json(orient='records')
        response = ResMsg(code=ResponseCode.SUCCESS, data=res)
    return response.data
