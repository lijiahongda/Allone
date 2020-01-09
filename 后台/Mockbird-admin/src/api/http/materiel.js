//物料管理
import request from '@/api/http.js'

//物料增
export function addMaterial(params) {
  return request({
    url: '/api/api-mats/mats-anon/addMaterial',
    method: 'post',
    data:params
  })
}
//物料删
export function deleteMaterial(params) {
  return request({
    url: '/api/api-mats/mats-anon/deleteMaterial',
    method: 'post',
    params
  })
}
//批量删除
export function deletearrMaterial(params) {
  return request({
    url: '/api/api-mats/mats-anon/batchDeleteMats',
    method: 'post',
    params
  })
}

//物料改
export function editMaterial(params) {
  return request({
    url: '/api/api-mats/mats-anon/editMaterial',
    method: 'post',
    params
  })
}
//物料修改状态
export function MaterialupdateStatus(params) {
  return request({
    url: '/api/api-mats/mats-anon/updateStatus',
    method: 'post',
    params
  })
}

//物料查
export function searchMaterial(params) {
  return request({
    url: '/api/api-mats/mats-anon/findByMaterialList',
    method: 'get',
    params
  })
}

//宣发影片

export function movieInfo(params) {
  return request({
    url: "/api/api-crw/mockbirdnewmovie/queryAll",
    method: "post",
    params
  })
}


//物料搜索
export function seafindMat(params) {
  return request({
    url: '/api/api-mats/mats-anon/findMat',
    method: 'get',
    params
  })
}