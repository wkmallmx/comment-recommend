from application.view.test import register_test_bps
from application.view.login import register_login_bps
from application.view.chapman import register_chapman_bps
from application.view.customer import register_customer_bps


def register_bps(app):
    register_login_bps(app)
    register_test_bps(app)
    register_customer_bps(app)
    register_chapman_bps(app)
