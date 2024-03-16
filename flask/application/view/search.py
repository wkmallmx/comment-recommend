from flask import Flask, Blueprint, request
from application.common import route, ResMsg, ResponseCode, make_key
from application.extensions import db, cache
from application.models import User
from application.extensions.requirment2.search_module import search_module
import pandas as pd

search_bp = Blueprint('search', __name__, url_prefix='/search')


# 前端发回用户名,查询字段，后端查询用户位置，返回搜索结果


@route(search_bp, '/business', methods=['GET', 'POST'])
@cache.cached(timeout=240, make_cache_key=make_key)
def get_search_business():
    if request.method == 'GET':
        return {"message": "search business"}, 200
    else:
        user = db.session.query(User).filter(
            User.username == request.form['username']).first()
        latitude = user.latitude
        longitude = user.longitude
        search_text = request.form['search_text']
        res = search_module.search_business(
            latitude, longitude, search_text, limit_distance=10, user_id=user.id)
        res = res[['business_id', 'name', 'distance', 'latitude', 'longitude']]
        # 转换为json格式
        res = res.to_json(orient='records')
        response = ResMsg(code=ResponseCode.SUCCESS, data=res)
    return response.data


@route(search_bp, '/user', methods=['GET', 'POST'])
@cache.cached(timeout=240, make_cache_key=make_key)
def get_search_user():
    if request.method == 'GET':
        return {"message": "search user"}, 200
    else:
        user = db.session.query(User).filter(
            User.username == request.form['username']).first()
        latitude = user.latitude
        longitude = user.longitude
        res = search_module.search_user(
            latitude, longitude, search_text=request.form['search_text'], user_id=user.id, limit_distance=10)
        res = res.drop(columns='friends').head(10)
        res = res.to_json(orient='records')
        response = ResMsg(code=ResponseCode.SUCCESS, data=res)
        return response.data
