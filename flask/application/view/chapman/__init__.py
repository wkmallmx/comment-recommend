from flask import Blueprint, Flask

# 创建蓝图
bp = Blueprint('chapman',__name__,url_prefix='/chapman')

def register_chapman_bps(app: Flask):
   
    # 注册蓝图
    app.register_blueprint(bp)
    