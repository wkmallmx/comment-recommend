from flask import Blueprint, Flask, jsonify
from application.common.response import ResMsg
from application.common.code import ResponseCode
from application.common.util import route

# 创建蓝图
bp = Blueprint('test', __name__, url_prefix='/test')


def register_test_bps(app: Flask):
    # 注册蓝图
    app.register_blueprint(bp)


@route(bp, '/', methods=['GET'])
def test():
    """
    测试响应封装
    :return:
    """
    res = ResMsg()
    id, name, mes = 1, 'test', 'test message'
    
    test_dict = dict(id=id, name=name, mes=mes)
    res.update(code=ResponseCode.SUCCESS, data=test_dict)
    return res.data
