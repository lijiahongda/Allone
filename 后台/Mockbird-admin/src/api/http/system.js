import request from '../http'

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

// 角色------------------------------------------------------------------
//角色列表
export function rolesList(params) {
    return request({
        url: '/lpi/api-u/roles',
        method: 'get',
        params
    })
}
//角色增
export function rolesAdd(params) {
    return request({
        url: '/lpi/api-u/roles',
        method: 'post',
        params
    })
}
//角色删
export function rolesDelete(params) {
    return request({
        url: '/lpi/api-u/roles/id/delete',
        method: 'post',
        params
    })
}
//角色改
export function rolesEdit(params) {
    return request({
        url: '/lpi/api-u/roles',
        method: 'put',
        params
    })
}

//获取角色权限回显
export function rolesPermissions(params) {
    return request({
        url: '/lpi/api-u/roles/permission',
        method: 'get',
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

// 权限------------------------------------------------------------------
//权限列表
export function listPermissions(params) {
    return request({
        url: '/lpi/api-u/permissions',
        method: 'get',
        params
    })
}
//权限增
export function addPermissions(params) {
    return request({
        url: '/lpi/api-u/permissions',
        method: 'post',
        data: params
    })
}
//权限删
export function deletePermissions(params) {
    return request({
        url: '/lpi/api-u/permissions/id/delete',
        method: 'post',
        params
    })
}
//权限改
export function editPermissions(params) {
    return request({
        url: '/lpi/api-u/permissions',
        method: 'put',
        data: params
    })
}
//权限授权
export function idPermissions(params) {
    return request({
        url: '/lpi/api-u/roles/id/permissions',
        method: 'post',
        data: params
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

//模糊搜索用户列表
export function ufindByUsers(params) {
    return request({
        url: '/lpi/api-u/findByUsers',
        method: 'post',
        params
    })
}

//模糊搜索角色列表
export function rolesSearch(params) {
    return request({
        url: '/lpi/api-u/roles',
        method: 'get',
        params
    })
}