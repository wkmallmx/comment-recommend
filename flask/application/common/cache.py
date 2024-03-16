from flask import request


def make_key():
    """A function which is called to derive the key for a computed value.
       The key in this case is the concat value of all the json request
       parameters. Other strategy could to use any hashing function.
    :returns: unique string for which the value should be cached.
    """
    user_data = request.form.to_dict()
    return ",".join([f"{key}={value}" for key, value in user_data.items()]) + request.path
