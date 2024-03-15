from flask import Flask
from .core import init_databases,db
from .requirment2.sentiment_analysis import sentiment_analysis
from .requirment2.search_module import search_recommend
from .gpt import get_suggestion
def init_plugs(app: Flask) -> None:
    init_databases(app)
    