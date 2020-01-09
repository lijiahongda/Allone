import request from '../http'

//星空投放资源管理
//星空云屏获取
export function starrySkyScreenlist(params) {
    return request({
        url: '/api/api-crw/starrySkyScreen/queryList',
        method: 'get',
        params
    })
}

//星空资源列表
export function starnetQueryList(params) {
    return request({
        url: '/api/api-crw/starnet/queryList',
        method: 'get',
        params
    })
}

//创建餐饮云屏
export function addCateringStarrySkys(params) {
    return request({
        url: '/api/api-crw/cateringStarrySky/add',
        method: 'post',
        data:params
    })
}

//根据ID删除餐饮云屏数据
export function CateringStarrySkysdelete(params) {
    return request({
        url: '/api/api-crw/cateringStarrySky/delete',
        method: 'post',
        params
    })
}

//更新餐饮云屏
export function CateringStarrySkysupdate(CateringStarrySky) {
    return request({
        url: '/api/api-crw/cateringStarrySky/update',
        method: 'post',
        data:CateringStarrySky
    })
}

//获取餐饮云屏数据(查)
export function getCateringStarrySkys(params) {
    return request({
        url: '/api/api-crw/cateringStarrySky/getCateringStarrySkys',
        method: 'get',
        params
    })
}