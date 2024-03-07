from flask import Blueprint, Flask

# 创建蓝图
bp = Blueprint('login',__name__,url_prefix='/login')

def register_login_bps(app: Flask):
   
    # 注册蓝图
    app.register_blueprint(bp)