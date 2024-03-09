from flask import Flask
from .test import test_bp
from .login import login_bp
from .chapman import register_chapman_bps
from .customer import register_customer_bps


def register_bps(app: Flask):
    app.register_blueprint(test_bp)
    app.register_blueprint(login_bp)
    register_customer_bps(app)
    register_chapman_bps(app)
