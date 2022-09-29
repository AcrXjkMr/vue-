import axios from "axios"


const exceptionMessage = {
    1000: "用户名或者密码发生错误"
}

import{ messgae} from "element-ui"
import store from "@/store"

const service = axios.create({
    timeout : 5000
})

service.interceptors.request.use(function(config){
    const token = store.getters.token
    if(token.config.headers.authorization ="Bearer " + token)
    return config
}),
function (error) {
    return Promise.reject(error);
  }
  
  // 响应拦截器
  service.interceptors.response.use(function (response) {
  
    if(response.status < 400) {
      return response.data.data
  
    }
  
    if(response.status === 401){
      // TODO token的过期处理
      // 清空本地的token以及用户信息
      // 跳转到登录页
      return
    }
  
  
    _showError(response.data.code, response.data.message)
  
    return response;
  }, function (error) {
    return Promise.reject(error);
  })
  
  /**
   * 错误提示
   * @param errorCode
   * @param message
   * @private
   */
  const _showError = (errorCode, message) => {
    let title
    title = exceptionMessage[errorCode] || message || '发生未知错误'
    Message.error(title)
  }
  
  /**
   * 解决不同请求方式时统一使用data来进行传参
   * @param options
   */
  const request = (options) => {
  
    options.method = options.method || 'get'
    if(options.method.toLowerCase() === "get"){
      options.params = options.data || options.params
      delete options.data
    }
  
    // 解决多个代理请求的问题
    service.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API
  
    return service(options)
  }
  
  
  // 导出实例对象
  export default request
  