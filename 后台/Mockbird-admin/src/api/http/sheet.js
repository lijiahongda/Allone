import request from '../http'
//排片管理
// 拍片订单列表
export function ordershtlist(params) {
    return request({
        url: '/ppi/api-crw/incrementPlatoon/queryOrder',
        method: 'get',
        params
    })
}
//根据订单ID和状态获取拍片订单信息
export function PlatoonqueryByOrderId(params) {
    return request({
        url: '/api/api-crw/incrementPlatoon/queryByOrderId',
        method: 'post',
        params
    })
}
//根据订单获取排片反馈图
export function FkqueryByPlatoonId(params) {
    return request({
        url: '/api/api-crw/incrementPlatoonTemporary/queryByPlatoonId',
        method: 'post',
        params
    })
}
//根据订单获取排片反馈图
export function FkupdPlatoonId(params) {
    return request({
        // url: '/api/api-crw/incrementPlatoon/newUpdateStatus',
        url: '/api/api-crw/incrementPlatoon/newExamine',
        method: 'post',
        params
    })
}