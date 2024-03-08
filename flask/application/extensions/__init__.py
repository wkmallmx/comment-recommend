from flask import Flask
from .core import init_databases

def init_plugs(app: Flask) -> None:
    init_databases(app)
