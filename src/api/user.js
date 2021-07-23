/**
  * 用户相关请求模块
  */

import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data: data
  })
}
// 获取用户信息
export const getUserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'))

  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile'
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}
// 修改用户信息
