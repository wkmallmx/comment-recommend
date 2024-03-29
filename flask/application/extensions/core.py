from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_caching import Cache


cache = Cache(config={'CACHE_TYPE': 'simple'})
def init_cache(app: Flask):
    cache.init_app(app)
    
db = SQLAlchemy()
def init_databases(app: Flask):
    db.init_app(app)
    if os.environ.get('WERKZEUG_RUN_MAIN') == 'true':
        with app.app_context():
            try:
                db.engine.connect()
            except Exception as e:
                exit(f"数据库连接失败, 请检查配置信息:{e}")