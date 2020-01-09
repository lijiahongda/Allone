//CMS
import request from '@/api/http_f.js'

//文章类型
//CMS增
export function addCMSA(params) {
  return request({
    url: '/spi/article-type-anon/addArticleType',
    method: 'post',
    params
  })
}

//CMS删
export function removeCMSA(params) {
  return request({
    url: '/spi/article-type-anon/deleteType',
    method: 'post',
    params
  })
}

//CMS批量删
export function removearrCMSA(params) {
  return request({
    url: '/spi/article-type-anon/batchDelete',
    method: 'post',
    params
  })
}

//CMS改
export function editCMSA(params) {
  return request({
    url: '/spi/article-type-anon/editArticleType',
    method: 'post',
    params
  })
}

//CMS查列表
export function cmsType(params) {
  return request({
    url: '/spi/article-type-anon/searchByArticleType',
    method: 'get',
    params
  })
}

//审核cms
export function toeCms(params) {
  return request({
    url: '/spi/article-anon/checkArticle',
    method: 'post',
    params
  })
}


//模糊搜cms
export function findArticleCms(params) {
  return request({
    url: '/spi/article-anon/findArticle',
    method: 'get',
    params
  })
}






//全部文章
export function allistCMS(params) {
  return request({
    // url: '/ypi/api-cms/article-anon/searchArticle',
    url: '/spi/article-anon/searchArtByType',
    method: 'get',
    params
  })
}

//筛选文章
export function listCMS(params) {
  return request({
    url: '/spi/article-anon/searchArticleByType',
    method: 'post',
    params
  })
}
//增
export function addArticle(params) {
  return request({
    url: '/spi/article-anon/addArticle',
    method: 'post',
    data: params
  })
}
//改
export function editArticle(params) {
  return request({
    url: '/spi/article-anon/editArticle',
    method: 'post',
    data: params
  })
}
//删
export function deleteArticle(params) {
  return request({
    url: '/spi/article-anon/updateStatus',
    method: 'post',
    params
  })
}
//批量删
export function batchCMS(params) {
  return request({
    url: '/spi/article-anon/batchUpdateStatus',
    method: 'post',
    params
  })
}
//文章审核
export function checkArticleCMS(params) {
  return request({
    url: '/spi/article-anon/checkArticle',
    method: 'post',
    params
  })
}