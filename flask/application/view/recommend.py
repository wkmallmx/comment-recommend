from flask import Flask, Blueprint, request
from application.common import route, ResMsg, ResponseCode,make_key
from application.extensions import db,cache
from application.models import User
import pandas as pd
from application.extensions import search_module

recommend_bp = Blueprint('recommend', __name__, url_prefix='/recommend')


@route(recommend_bp, '/business', methods=['GET', 'POST'])
@cache.cached(timeout=240, make_cache_key=make_key)
def recommend_business():
    if request.method == 'GET':
        return {"message": "recommend"}, 200
    else:
        user = db.session.query(User).filter(
            User.username == request.form['username']).first()
        latitude = user.latitude
        longitude = user.longitude
        res = search_module.recommend_business(
            latitude, longitude, user_id=user.id, limit_distance=10)
        print(res.columns)
        res = res.to_json(orient='records')
        response = ResMsg(code=ResponseCode.SUCCESS, data=res)
        return response.data


@route(recommend_bp, '/user', methods=['GET', 'POST'])
@cache.cached(timeout=240,make_cache_key=make_key)
def recommend_user():
    if request.method == 'GET':
        return {"message": "recommend"}, 200
    else:
        user = db.session.query(User).filter(
            User.username == request.form['username']).first()
        latitude = user.latitude
        longitude = user.longitude
        res = search_module.recommend_user(
            latitude, longitude, user_id=user.id, limit_distance=10)
        print(res.columns)
        print(res.head())
        res = res.drop(columns='friends')
        res = res.to_json(orient='records')
        response = ResMsg(code=ResponseCode.SUCCESS, data=res)
        return response.data
