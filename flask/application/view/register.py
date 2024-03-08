from flask import Blueprint, Flask, request
from application.common.util import route
from application.models.user import User
from application.extensions.core import db
from application.common.response import ResMsg
from application.common.code import ResponseCode

# 创建蓝图
bp = Blueprint('register', __name__, url_prefix='/register')


def register_register_bps(app: Flask):
    # 注册蓝图
    app.register_blueprint(bp)


@route(bp, '/', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        username = 'testuser'
        password = '123456'
        role = 'chapman'
    else:
        username = request.json.get('username')
        password = request.json.get('password')
        role = request.json.get('role')

    user = db.session.query(
        User).filter(User.username == username).first()
    if user is not None:
        return {'msg': '用户已存在'}, ResponseCode.FAIL

    user = User(username=username, password=password, role=role)
    db.session.add(user)
    db.session.commit()

    res = ResMsg()
    res.update(code=ResponseCode.SUCCESS)
    return res.data
