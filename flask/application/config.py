import logging
from datetime import timedelta

from urllib.parse import quote_plus as urlquote


class BaseConfig:
    # # mysql 配置
    # MYSQL_USERNAME = "root"
    # MYSQL_PASSWORD = "12345678"
    # MYSQL_HOST = "localhost"
    # MYSQL_PORT = 3306
    # MYSQL_DATABASE = "comment"

    # 数据库配置信息
    # SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{MYSQL_USERNAME}:\
    # {urlquote(MYSQL_PASSWORD)}\
    # @{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}\
    # ?charset=utf8mb4"

    # sqlite 配置
    SQLALCHEMY_DATABASE_URI = "sqlite:///comment.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # 默认日志等级
    LOG_LEVEL = logging.WARN
