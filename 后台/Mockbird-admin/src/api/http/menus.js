import request from '../http_s.js'

// 菜单------------------------------------------------------------------
//系统菜单
export function menusAll() {
    return request({
        url: '/mpi/menus/all',
        method: 'get'
    })
}
//系统菜单增
export function menusSave(params) {
    return request({
        url: '/mpi/menus/save',
        method: 'post',
        params
    })
}
//系统菜单改
export function menusUpdate(params) {
    return request({
        url: '/mpi/menus/update',
        method: 'put',
        params
    })
}
//系统菜单删
export function menusDelete(params) {
    return request({
        url: '/mpi/menus/id/delete',
        method: 'post',
        params
    })
}

//获取角色菜单列表回显
export function menuRoleId(params) {
    return request({
        url: '/mpi/menus',
        method: 'get',
        params
    })
}
//分配菜单
export function menustoRole(params) {
    return request({
        url: '/mpi/menus/toRole',
        method: 'post',
        data: params
    })
}