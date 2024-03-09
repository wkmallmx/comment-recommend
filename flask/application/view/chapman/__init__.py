from flask import Blueprint, Flask
from .mood import mood_bp
# 创建蓝图
bp = Blueprint('chapman',__name__,url_prefix='/chapman')

def register_chapman_bps(app: Flask):
   
    # 注册蓝图
    bp.register_blueprint(mood_bp)
    app.register_blueprint(bp)
    