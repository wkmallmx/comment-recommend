
// 引入axios
import axios from "axios"
// 进度条和样式
import nProgress from "nprogress" // npm install nprogress
import "nprogress/nprogress.css"
// 实例化axios
const install = axios.create({
    // 请求地址的前缀 公共全局的URL
    baseURL:"",
    // 请求时长  --- 超出定义的时长，请求超时
    timeout:5000
})
// 请求拦截
install.interceptors.request.use(
    (config)=>{
        // 开始进度条
        nProgress.start()
        // 获取token
        const token = localStorage.getItem('token')
        // 请求头携带token
        config.headers[''] = "Bearer " + token
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
// 响应拦截
install.interceptors.response.use(
    (response: any)=>{
        // 响应成功关闭进度条
        nProgress.done()
        // 返回响应的数据
        return response
    },
    (error)=>{
        // 请求超时处理
        if(error.message.includes('timeout')){
            alert('请求超时')
            return;
        }
        // 不同错误状态码处理
        const code = error.response.status;
        switch(code){
            case 400:
                console.log('请求错误');
                break;
            case 401:
                console.log('未授权');
                break;
            case 403:
                console.log('禁止访问');
                break;
            case 404:
                console.log('页面消失');
                break;
            case 500:
                console.log('服务器内部错误');
                break;
            case 502:
                console.log('网关错误');
                break;
        }
        return Promise.reject(error)
    }
)
// 导出封装好的aixos
export default install
