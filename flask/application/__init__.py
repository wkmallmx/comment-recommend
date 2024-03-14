import os
from flask import Flask
from application.config import BaseConfig
from application.view import register_bps
from application.extensions import init_plugs
from flask_cors import CORS

def create_app():
    app = Flask(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

    # 引入配置
    app.config.from_object(BaseConfig)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # 注册蓝图
    register_bps(app)
    
    # 注册插件
    init_plugs(app)

    return app
