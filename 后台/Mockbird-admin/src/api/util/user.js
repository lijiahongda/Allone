import request from '../http'
//用户管理
// 登陆
export function login(username, password) {
  return request({
    // url: '/ypi/sys/login',
    url: '/lpi/sys/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}
// 获取角色信息
export function getInfo(access_token) {
  return request({
    // url: '/ypi/api-u/users/current',
    url: '/lpi/api-u/users/current',
    method: 'get',
    params: { access_token }
  })
}

//刷新token
export function getrefreshtoken(refresh_token) {
  return request({
    url: '/lpi/sys/refresh_token',
    method: 'post',
    params: { refresh_token }
  })
}

// 获取列表
export function getTabList(access_token) {
  return request({
    // url: '/ypi/api-b/menus/me',
    url: '/mpi/menus/me',
    method: 'get',
    params: { access_token }
  })
}

//登出
export function logout(params) {
  return request({
    url: '/lpi/sys/logout',
    method: 'get',
    params
  })
}


// 用户查询------------------------
//用户列表
export function userSearch(params){
  return request({
    url: '/lpi/api-u/search/users',
    method: 'get',
    params
  })
}
  //新建用户
  export function anonaddUser(params){
    return request({
      url: '/lpi/api-u/users-anon/addUser',
      method: 'post',
      params
    })
  }

  //查看用户角色
export function usersRoles(params){
  return request({
    url: '/lpi/api-u/users/id/roles',
    method: 'get',
    params
  })
}
 //用户添加角色
 export function usproRoles(params){
  return request({
    url: '/lpi/api-u/users/id/roles',
    method: 'post',
    data:params
  })
}
  //用户编辑
  export function usersEdit(params){
    return request({
      url: '/lpi/api-u/users',
      method: 'put',
      params
    })
  }

  