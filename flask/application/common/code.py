class ResponseCode(object):
    SUCCESS = 0  # 成功
    FAIL = -1  # 失败
    NO_RESOURCE_FOUND = 40001  # 未找到资源
    INVALID_PARAMETER = 40002  # 参数无效
    ACCOUNT_OR_PASS_WORD_ERR = 40003  # 账户或密码错误


class ResponseMessage(object):
    SUCCESS = "success"
    FAIL = "fail"
    NO_RESOURCE_FOUND = "not found resource"
    INVALID_PARAMETER = "invalid parameter"
    ACCOUNT_OR_PASS_WORD_ERR = "account or password error"
