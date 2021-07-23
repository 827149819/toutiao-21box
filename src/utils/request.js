/**
 *  基于 axios 封装的请求模块
 */
// eslint-disable-next-line no-unused-vars
import axios from 'axios'

import JSONbig from 'json-bigint'

// 创建一个 axios 实例，复制了一个axios
// 通过实例发送请求
const request = axios.create({
  baseURL: 'http://localhost:80/',
  // 定制后端返回的原始数据的处理
  // data：未经处理的JSON格式字符串
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(
  // 拦截任何请求
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))

    // 统一设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // return config 之后请求才会真正发送出去
    return config
  },
  // 拦截错误请求
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器

axios({
  method: '',
  url: ''
})

// 导出请求方法
export default request
