import request from '../http'

//添加广告推广
export function Pushadadd(params) {
    return request({
        url: '/api/api-n/pushad/add',
        // url: '/api/api-n/pushad/add',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data:params
    })
}

//修改广告推广
export function Pushadupdata(params) {
    return request({
        url: '/api/api-n/pushad/update',
        // url: '/api/api-n/pushad/update',
        method: 'put',
        data:params
    })
}

//删除广告推广
export function Pushaddelete(params) {
    return request({
        url: '/api/api-n/pushad/delete',
        // url: '/api/api-n/pushad/delete',
        method: 'post',
        params
    })
}

//获取广告推广
export function Pushadgetlist(params) {
    return request({
        url: '/api/api-n/pushad/findPushAdvList',
        // url: '/api/api-n/pushad/findPushAdvList',
        method: 'get',
        params
    })
}

//广告审核
export function PushcheckPushAd(params) {
    return request({
        url: '/api/api-n/pushad/checkPushAd',
        // url: '/api/api-n/pushad/checkPushAd',
        method: 'post',
        params
    })
}