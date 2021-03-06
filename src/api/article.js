/**
 * 文章相关请求模块
 */

import request from '@/utils/request'

export const getArticles = (params) => {
  return request({
    method: 'get',
    url: '/mp/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params
  })
}

export const getArticleChannels = () => {
  return request({
    method: 'get',
    url: '/mp/v1_0/channels'
  })
}

export const delArticle = (articleId) => {
  return request({
    method: 'delete',
    // :target  接口文档中的路径参数，需要在url中传递
    url: `/mp/v1_0/articles/${articleId}`
  })
}

export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    // :target  接口文档中的路径参数，需要在url中传递
    url: '/mp/v1_0/articles',
    params: {
      draft: draft
    },
    data: data
  })
}

export const updArticle = (articleId, data, draft = false) => {
  return request({
    method: 'put',
    // :target  接口文档中的路径参数，需要在url中传递
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft: draft
    },
    data: data
  })
}

export const getArticle = (articleId) => {
  return request({
    method: 'get',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 修改文章的评论状态
export const updateCommentStatus = (articleId, allowComment) => {
  return request({
    method: 'put',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
