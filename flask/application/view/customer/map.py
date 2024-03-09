from flask import Flask, Blueprint, request
from application.common import route, ResMsg, ResponseCode
from application.extensions import db


map_bp = Blueprint('map', __name__, url_prefix='/map')


# 前端发回用户名，后端返回附近的商店
@route(map_bp, '/sql', methods=['POST'])
def get_nearby_shops_sql():
    
    return {'msg': '获取附近商店成功'}, 200
