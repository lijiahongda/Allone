import request from '../http'

//充值记录列表
export function getPayOrderList(params) {
    return request({
      url: '/api/api-ptm/pay/getPayOrderList',
      method: 'get',
      params
    })
  }

  //提现记录列表
export function payGetList(params) {
    return request({
      url: '/api/api-ptm/pay/getList',
      method: 'get',
      params
    })
  }