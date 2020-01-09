import request from '../http'

//企业
//企业认证查
export function Businesslist(params) {
    return request({
        url: '/api/api-crw/company/getList',
        method: 'get',
        params
    })
}

//企业认证增
export function Businessadd(params) {
    return request({
        url: '/api/api-crw/company/add',
        method: 'post',
        data:params
    })
}

//企业认证删
export function Businessdelete(params) {
    return request({
        url: '/api/api-crw/company/delete',
        method: 'post',
        params
    })
}

//企业认证改
export function Businessedit(params) {
    return request({
        url: '/api/api-crw/company/update',
        method: 'put',
        data:params
    })
}