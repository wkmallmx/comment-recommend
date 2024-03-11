from application.extensions.core import db


class User(db.Model):
    """
    User model
    """
    __tablename__ = 'user'
    id = db.Column(db.String(50), primary_key=True,
                   autoincrement=True, comment='用户ID')
    username = db.Column(db.String(50), unique=True,
                         nullable=False, comment='用户名')
    password = db.Column(db.String(50), nullable=False, comment='密码')
    role = db.Column(db.String(50), nullable=False, comment='角色')
    latitude = db.Column(db.Float, nullable=False, comment='纬度')
    longitude = db.Column(db.Float, nullable=False, comment='经度')

