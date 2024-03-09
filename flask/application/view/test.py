from flask import Blueprint, Flask, jsonify
from application.common.response import ResMsg
from application.common.code import ResponseCode
from application.common.util import route
import pandas as pd

# 创建蓝图
test_bp = Blueprint('test', __name__, url_prefix='/test')



@route(test_bp, '/', methods=['GET'])
def test():
    
    res = ResMsg()
    id, name, mes = 1, 'test', 'test message'
    
    test_dict = dict(id=id, name=name, mes=mes)
    res.update(code=ResponseCode.SUCCESS, data=test_dict)
    return res.data
