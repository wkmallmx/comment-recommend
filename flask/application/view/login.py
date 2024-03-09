from flask import Blueprint, Flask, request
from application.common import route, ResMsg, ResponseCode
from application.models import User
from application.extensions import db

# 创建蓝图
login_bp = Blueprint('login', __name__, url_prefix='/login')


@route(login_bp, '/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        username = 'admin'
        password = '123456'
    else:
        # 获取请求参数
        username = request.json.get('username')
        password = request.json.get('password')

    # 查询用户

    user = db.session.query(
        User).filter(User.username == username).first()
    true_password = user.password
    role = user.role
    # 用户不存在
    if true_password is None:
        # return {'msg': '用户不存在'}, ResponseCode.FAIL
        return {'msg': '用户不存在'}, ResponseCode.FAIL
    # 密码错误
    if not true_password == password:
        return {'msg': '密码错误'}, ResponseCode.FAIL
    #  登录成功
    else:
        res = ResMsg()
        res.update(code=ResponseCode.SUCCESS, data={'role': role})
        return res
