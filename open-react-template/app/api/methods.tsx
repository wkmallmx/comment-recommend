// 引入封装好的axios
import install from './axios_api'
// 定义任意类型接口
interface anyType{
    [key:string]:any | (string|number)
}
// 定义类型接口
interface dataType{
    url:string, // 路径
    method?:string,  // 请求方法 get / post...
    headers?:anyType, // 请求头
    params?:anyType, // get请求携带参数用的
    data?:anyType, // post请求携带参数用的
}

// 创建 get 请求方法
export const get = (data:dataType)=>{
    // 定义请求方法
    data.method = "GET"
    // 返回
    return install(data)
}

// 创建post请求方法
export const post = (data:dataType)=>{
    // 定义post请求方法
    data.method = "POST"
    // 返回
    return install(data)
}
