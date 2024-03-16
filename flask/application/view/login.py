from flask import Blueprint, Flask, request
from application.common import route, ResMsg, ResponseCode, make_key
from application.models import User
from application.extensions import db, cache
import json
# 创建蓝图
login_bp = Blueprint('login', __name__, url_prefix='/login')

data_example_pass = {
    'username': 'admin',
    'password': '123456'
}

data_example_wrongpassword = {
    'username': 'admin',
    'password': '1234567'
}

data_example_wrongusername = {
    'username': 'admin1',
    'password': '123456'
}


@route(login_bp, '/', methods=['GET', 'POST'])
@cache.cached(timeout=60, make_cache_key=make_key)
def login():
    if request.method == 'GET':
        username = 'admin'
        password = '123456'
    if request.method == 'POST':
        # 获取请求参数
        username = request.form['username']
        password = request.form['password']

    # 查询用户
    user = db.session.query(
        User).filter(User.username == username).first()
    if user is None:
        return {'msg': '用户不存在'}, ResponseCode.FAIL
    true_password = user.password

    # 用户不存在

    # 密码错误
    if not true_password == password:
        return {'msg': '密码错误'}, ResponseCode.FAIL
    #  登录成功
    else:
        role = user.role
        latitude = user.latitude
        longitude = user.longitude
        id = user.id

        res = ResMsg()
        res.update(code=ResponseCode.SUCCESS, data={
                   'role': role, 'latitude': latitude, 'longitude': longitude, 'id': id})
        return res.data
