import request from '../http'

//订单管理
//院方订单
export function searchByOrderList(params) {
    return request({
        url: '/api/api-ad/adOrder/searchByOrderList',
        method: 'get',
        params
    })
} 
//订单搜所
export function searchfindOrderId(params) {
    return request({
        url: '/api/api-ad/adOrder/findOrderId',
        method: 'get',
        params
    })
}

//消息
//消息列表
export function Messagegetlist(params) {
    return request({
        url: '/api/api-n/message/getList',
        method: 'get',
        params
    })
}

//发送消息
export function sendMessage(params) {
    return request({
        url: '/api/api-n/message/add',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
        data:params
    })
}

//积分
//积分列表
export function integralDetailedList(params) {
    return request({
        url: '/api/api-u/user-anon/getList',
        method: 'get',
        params
    })
}
//积分减
export function ConsumptionIntegralj(params) {
    return request({
        url: '/api/api-crw/integral/consumptionIntegral',
        method: 'post',
        params
    })
}
//积分加
export function ConsumptionIntegralja(params) {
    return request({
        url: '/api/api-crw/integral/summation',
        method: 'post',
        params
    })
}
//积分历史
export function integralDetailedqueryList(params) {
    return request({
        url: '/api/api-crw/integralDetailed/queryList',
        method: 'post',
        params
    })
}
//地区集合
export function addressSelectAll(params) {
    return request({
        url: '/api/api-crw/address/selectAll',
        method: 'post',
        params
    })
}

//院线列表
export function Theatrechain(params) {
    return request({
        // url: '/api/api-cm/cinema/theatrechain',
        url: '/api/api-crw/courtyardline/queryList',
        method: 'post',
        params
    })
}
//院线增
export function TheatrechainAdd(params) {
    return request({
        url: '/api/api-crw/courtyardline/insert',
        method: 'post',
        params
    })
}
//院线删
export function TheatrechainDelete(params) {
    return request({
        url: '/api/api-crw/courtyardline/delete',
        method: 'post',
        params
    })
}
//院线改
export function TheatrechainEdit(params) {
    return request({
        url:'/api/api-crw/courtyardline/modify',
        method: 'post',
        params
    })
}
//院线详情列表
export function TheatrechainDetails(params) {
    return request({
        url: '/api/api-cm/cinema/theatrechainDetails',
        method: 'post',
        params
    })
}


//影院列表
export function cinemaListByParams(params) {
    return request({
        url: '/api/api-crw/mockbirdcinema/queryList',
        method: 'post',
        params
    })
}
//影院增
export function cinemaListByAdd(params) {
    return request({
        url: '/api/api-crw/mockbirdcinema/insert',
        method: 'post',
        params
    })
}
//影院删
export function cinemaListByDelete(params) {
    return request({
        url: '/api/api-crw/mockbirdcinema/delete',
        method: 'post',
        params
    })
}
//影院改
export function cinemaListByEdit(params) {
    return request({
        url: '/api/api-crw/mockbirdcinema/modify',
        method: 'post',
        data:params
    })
}
//影院详情
export function cinemaListByDetail(params) {
    return request({
        url: '/api/api-cm/cinema/queryCinemaDetails',
        method: 'post',
        params
    })
}
