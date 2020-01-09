//其他
import request from '@/api/http.js'


//数据上传
//伊恩
export function Upexcel(file) {
    return request({
        url: '/api/excel/uploadtext',
        method: 'post',
        file
    })
}
//本地数据提交
export function operUpexcel(params) {
    return request({
        url: '/api/mockbirdcinema/add',
        method: 'post',
        params
    })
}
export function sendUpexcel(platoonIntention) {
    return request({
        url: '/ypi/api-fsch/platoonIntention/add',
        method: 'post',
        data: platoonIntention
    })
}


//院线列表
export function Theatrechain(params) {
    return request({
        url: '/api/courtyardline/queryList',
        method: 'post',
        params
    })
}
//院线增
export function TheatrechainAdd(params) {
    return request({
        url: '/api/courtyardline/insert',
        method: 'post',
        params
    })
}
//院线删
export function TheatrechainDelete(params) {
    return request({
        url: '/api/courtyardline/delete',
        method: 'post',
        params
    })
}
//院线改
export function TheatrechainEdit(params) {
    return request({
        // url: '/lpi/api-cm/cinema/theatrechainDetails',
        url:'/api/courtyardline/modify',
        method: 'post',
        params
    })
}
//院线详情列表
export function TheatrechainDetails(params) {
    return request({
        url: '/lpi/api-cm/cinema/theatrechainDetails',
        method: 'post',
        params
    })
}


//影院列表
export function cinemaListByParams(params) {
    return request({
        // url: '/lpi/api-cm/cinema/queryListByParams',
        url: '/api/mockbirdcinema/queryList',
        method: 'post',
        params
    })
}
//影院增
export function cinemaListByAdd(params) {
    return request({
        // url: '/lpi/api-cm/cinema/queryCinemaDetails',
        url: '/api/mockbirdcinema/insert',
        method: 'post',
        params
    })
}
//影院删
export function cinemaListByDelete(params) {
    return request({
        // url: '/lpi/api-cm/cinema/queryCinemaDetails',
        url: '/api/mockbirdcinema/delete',
        method: 'post',
        params
    })
}
//影院改
export function cinemaListByEdit(params) {
    return request({
        // url: '/lpi/api-cm/cinema/queryCinemaDetails',
        url: '/api/mockbirdcinema/modify',
        method: 'post',
        data:params
    })
}
//影院详情
export function cinemaListByDetail(params) {
    return request({
        url: '/lpi/api-cm/cinema/queryCinemaDetails',
        method: 'post',
        params
    })
}

//地区集合
export function addressSelectAll(params) {
    return request({
        url: '/api/address/selectAll',
        method: 'post',
        params
    })
}







//公司库列表
export function Companylibrary(params) {
    return request({ 
        url: '/lpi/companyllibrary/queryList',
        method: 'post',
        params
    })
}

//订单管理
//院方订单
export function searchByOrderList(params) {
    return request({
        url: '/lpi/api-ad/adOrder/searchByOrderList',
        method: 'get',
        params
    })
} 
//订单搜所
export function searchfindOrderId(params) {
    return request({
        url: '/lpi/api-ad/adOrder/findOrderId',
        method: 'get',
        params
    })
}





//用户认证
//用户认证列表
export function anongetUserAuth(params) {
    return request({
        url: '/lpi/api-u/users-anon/getUserAuth',
        method: 'get',
        params
    })
}
//用户认证状态修改
export function anonAuthAudit(params) {
    return request({
        url: '/lpi/api-u/users-anon/userAuthAudit',
        method: 'post',
        params
    })
}
//用户认证提交用户信息
export function Companyverify(CompanyVo) {
    return request({
        url: '/api/mockbirdcinema/verify',
        method: 'post',
        data:CompanyVo
    })
}

//消息列表
export function Messagegetlist(params) {
    return request({
        url: '/lpi/api-n/message/getList',
        method: 'get',
        params
    })
}

//消息列表
export function sendMessage(params) {
    return request({
        url: '/lpi/api-n/message/add',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
        data:params
    })
}


//积分列表
export function integralDetailedList(params) {
    return request({
        url: '/lpi/api-u/user-anon/getList',
        method: 'get',
        params
    })
}
//积分jian
export function ConsumptionIntegralj(params) {
    return request({
        url: '/api/integral/consumptionIntegral',
        method: 'post',
        params
    })
}
//积分jia
export function ConsumptionIntegralja(params) {
    return request({
        url: '/api/integral/summation',
        method: 'post',
        params
    })
}
//积分历史
export function integralDetailedqueryList(params) {
    return request({
        url: '/api/integralDetailed/queryList',
        method: 'post',
        params
    })
}

