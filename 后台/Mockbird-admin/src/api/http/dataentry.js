import request from '../http'

//提交艺恩数据表
export function yenupLoader(params) {
    return request({
        url: '/api/api-crw/mockbirdcinema/add',
        method: 'post',
        params
    })
}
//提交餐饮云屏数据表
export function excelAnalysis(params) {
    return request({
        url: '/api/api-crw/cateringStarrySky/excelAnalysis',
        method: 'get',
        params
    })
}