from flask import Flask, Blueprint, request
from application.common import route, ResMsg, ResponseCode,make_key
from application.extensions.requirment2.suggestion import get_matching_attributes
from application.extensions import get_suggestion
from application.extensions import cache

suggest_bp = Blueprint('suggest', __name__, url_prefix='/suggest')


@route(suggest_bp, '/', methods=['GET', 'POST'])
@cache.cached(timeout=240,make_cache_key=make_key)
def suggest():
    if request.method == 'GET':
        return {"message": "suggest"}, 200
    else:
        business_id = request.form['business_id']
        business_df, res = get_matching_attributes(business_id)
        business_df = str(business_df.first().asDict())
        suggest = get_suggestion(business_df, str(res))
        response = ResMsg(code=ResponseCode.SUCCESS,
                          data=dict(result=res, advice=suggest))
        return response.data
