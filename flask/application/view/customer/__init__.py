from flask import Blueprint, Flask

# 创建蓝图
bp = Blueprint('customer',__name__,url_prefix='/customer')

def register_customer_bps(app: Flask):
   
    # 注册蓝图
    app.register_blueprint(bp)