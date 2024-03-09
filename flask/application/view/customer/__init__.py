from flask import Blueprint, Flask
from .map import map_bp

# 创建蓝图
bp = Blueprint('customer',__name__,url_prefix='/customer')

def register_customer_bps(app: Flask):
    # 注册蓝图
    bp.register_blueprint(map_bp)
    app.register_blueprint(bp)
    