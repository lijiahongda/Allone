import request from '../httpxx.js'
//积分列表
//积分列表
//积分列表
//积分列表
export function pointRulequeryAll(params) {
    return request({
      url: '/xxjpi/pointRule/queryAll',
      method: 'get',
      params
    })
  }
  
  export function pointRuleinsert(params) {
    return request({
      url: '/xxjpi/pointRule/insert',
      method: 'post',
      data:params
    })
  }

  export function pointRuleupdate(params) {
    return request({
      url: '/xxjpi/pointRule/update',
      method: 'post',
      params
    })
  }

  export function pointRuledeleteById(params) {
    return request({
      url: '/xxjpi/pointRule/deleteById',
      method: 'post',
      data:params
    })
  }
  export function pointRuleupdateClose(params) {
    return request({
      url: '/xxjpi/pointRule/updateClose',
      method: 'post',
      params
    })
  }