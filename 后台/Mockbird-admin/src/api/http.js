import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '../store'
import router from '../router';
// import {getrefreshtoken} from './http/user.js'
// 创建axios实例
const service = axios.create({
  // baseURL: "http://mockbird.net:8080", // api的base_url
  timeout: 600000// 请求超时时间
})

// request拦截器
const bearer = 'Bearer '
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = bearer + store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  let loading = Loading.service({
    fullscreen: true,
    text: '拼命加载中...',
    // target:'#main'
  });
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  let loading = Loading.service({});
  loading.close();
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    let loading = Loading.service({});
    loading.close();
    return response;
  },

  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          Message({
            message: '密码错误,请重新输入',
            type: 'error'
          })
          Promise.reject(error)
          break;
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          let loading = Loading.service({});
          loading.close();
          break;
        case 403:
          router.replace({
            path: '/403',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          loading.close();
          break;
        default:
          Message({
            message: '未知错误,请联系管理员',
            type: 'error'
          })
          loading.close();
      }
    } else {
      Message({
        message: error,
        type: 'error'
      })
      loading.close();
      return Promise.reject(error)
    }
  }
)

export default service
