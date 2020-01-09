//业务
import request from '@/api/http.js'

// //院线列表
// export function yuanxianlist(params) {
//     return request({
//       url: '/ypi/api-cm/cinema/theatrechain',
//       method: 'post',
//       params
//     })
//   }
//院线列表
export function yuanxianlist(params) {
  return request({
    url: '/api/courtyardline/queryCourtyardLines',
    method: 'post',
    params
  })
}
  
  //影院列表
  export function yingyuanlist(params) {
      return request({
        url: '/ypi/api-cm/cinema/queryListByParams',
        method: 'post',
        params
      })
  }
  
//影院详情
export function yingyuandetail(params) {
    return request({
      url: '/ypi/api-cm/cinema/queryCinemaDetails',
      method: 'post',
      params
    })
  }
  
  
  //院线详情列表
  export function yuanxiandetail(params){
    return request({
      url:'/ypi/api-cm/cinema/theatrechainDetails',
      method:'post',
      params
    })
  }