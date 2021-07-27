import request from '@/utils/request'
// 上传素材
export const uploadImage = (data) => {
  return request({
    method: 'post',
    url: '/mp/v1_0/user/images',
    // 一般文件上传的接口都要求把请求头中的 Content-Type
    // 设置为 multipart/form-data, 但是我们使用axios上传文件的话
    // 不需要手动设置，只要给data一个FormData对象即可
    data
  })
}

// 获取素材列表
export const getImages = (params) => {
  return request({
    method: 'get',
    url: '/mp/v1_0/user/images',
    params
  })
}

// 收藏素材
export const collectImage = (imageId, collect) => {
  return request({
    method: 'put',
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}

// 删除材
export const delImage = imageId => {
  return request({
    method: 'delete',
    url: `/mp/v1_0/user/images/${imageId}`
  })
}
