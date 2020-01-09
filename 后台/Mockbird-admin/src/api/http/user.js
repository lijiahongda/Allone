import request from '../http'

// 登陆
export function login(username, password) {
    return request({
        url: '/api/sys/login',
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
        url: '/api/api-u/users/current',
        method: 'get',
        params: { access_token }
    })
}

// 获取列表
export function getTabList(access_token) {
    return request({
        url: '/mpi/menus/me',
        method: 'get',
        params: { access_token }
    })
}

//登出 
export function logout(params) {
    return request({
        url: '/api/sys/logout',
        method: 'get',
        params
    })
}

//刷新token
export function getrefreshtoken(refresh_token) {
    return request({
        url: '/api/sys/refresh_token',
        method: 'post',
        params: { refresh_token }
    })
}

//用户认证=============================================================
//用户认证列表
export function anongetUserAuth(params) {
    return request({
        url: '/api/api-u/users-anon/getUserAuth',
        method: 'get',
        params
    })
}
//用户认证状态修改
export function anonAuthAudit(params) {
    return request({
        url: '/api/api-u/users-anon/userAuthAudit',
        method: 'post',
        params
    })
}
//用户认证提交用户信息
export function Companyverify(CompanyVo) {
    return request({
        url: '/api/api-crw/mockbirdcinema/verify',
        method: 'post',
        data: CompanyVo
    })
}

// 用户查询-----------------------------------------------
//用户列表
export function userSearch(params) {
    return request({
        // url: '/opi/api-u/searchUsersByUserType',
        // method: 'post',
        url: '/api/api-u/search/users',
        method: 'get',
        params
    })
}
//新建用户
export function anonaddUser(params) {
    return request({
        url: '/api/api-u/users-anon/addUser',
        method: 'post',
        params
    })
}

//查看用户角色
export function usersRoles(params) {
    return request({
        url: '/api/api-u/users/id/roles',
        method: 'get',
        params
    })
}
//用户添加角色
export function usproRoles(params) {
    return request({
        url: '/api/api-u/users/id/roles',
        method: 'post',
        data: params
    })
}
//用户编辑
export function usersEdit(params) {
    return request({
        url: '/api/api-u/users',
        method: 'put',
        params
    })
}