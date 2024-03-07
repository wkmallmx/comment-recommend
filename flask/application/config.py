import logging
from datetime import timedelta

from urllib.parse import quote_plus as urlquote

class BaseConfig:
    # mysql 配置
    MYSQL_USERNAME = "root"
    MYSQL_PASSWORD = "123456"
    MYSQL_HOST = "127.0.0.1"
    MYSQL_PORT = 3306
    MYSQL_DATABASE = "comment"
    
    # 数据库配置信息
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{MYSQL_USERNAME}:\
    {urlquote(MYSQL_PASSWORD)}\
    @{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}\
    ?charset=utf8mb4"
    
    # 默认日志等级
    LOG_LEVEL = logging.WARN
    
    