from flask import Flask
from .login import login_bp
from .search import search_bp
from .recommend import recommend_bp
from .mood import mood_bp
from .suggest import suggest_bp


def register_bps(app: Flask):
    app.register_blueprint(search_bp)
    app.register_blueprint(login_bp)
    app.register_blueprint(recommend_bp)
    app.register_blueprint(mood_bp)
    app.register_blueprint(suggest_bp)
