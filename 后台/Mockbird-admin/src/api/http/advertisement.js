import request from '../http'

//广告
//广告类型
export function typeGG(params) {
    return request({
        url: '/api/api-ad/adtypes/getAdTypesList',
        method: 'get',
        params
    })
}

//广告类型增
export function addGG(params) {
    return request({
        url: '/api/api-ad/adtypes/addAdType',
        method: 'post',
        params
    })
}

//广告类型改
export function editGG(params) {
    return request({
        url: '/api/api-ad/adtypes/editAdType',
        method: 'post',
        params
    })
}

//广告类型删
export function deleteGG(params) {
    return request({
        url: '/api/api-ad/adtypes/delete',
        method: 'post',
        params
    })
}

//广告类型批量删
export function deletearrGG(params) {
    return request({
        url: '/api/api-ad/adtypes/bacthDelete',
        method: 'post',
        params
    })
}

//广告列表   
export function menulistGG(params) {
    return request({
        url: '/api/api-ad/advert/findByadvList',
        method: 'get',
        params
    })
}

//广告列表筛选
export function typelistGG(params) {
    return request({
        url: '/api/api-ad/advert/findByTypeIdToAdv',
        method: 'get',
        params
    })
}

//广告增
export function addlistGG(params) {
    return request({
        url: '/api/api-ad/advert/addAdvert',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: params
    })
}

//广告改
export function editlistGG(params) {
    return request({
        url: '/api/api-ad/advert/updateAdvert',
        method: 'post',
        params
    })
}

//广告删
export function deletelistGG(params) {
    return request({
        url: '/api/api-ad/advert/updateStatus',
        method: 'post',
        params
    })
}

//广告批量删
export function deletelistarrGG(params) {
    return request({
        url: '/api/api-ad/advertising/batchUpdateStatus',
        method: 'post',
        params
    })
}

//广告模糊搜索
export function adfindAdv(params) {
    return request({
        url: '/api/api-ad/advert/findAdv',
        method: 'get',
        params
    })
}

//广告审核
export function checkadvGG(params) {
    return request({
        url: '/api/api-ad/advert/checkadv',
        method: 'post',
        params
    })
}