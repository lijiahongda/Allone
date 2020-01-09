import request from '../http'

//影片管理
//影片列表
export function queryAllList(params) {
    return request({
        url: '/api/api-crw/mockbirdnewmovie/queryAll',        
        method: 'post',
        params
    })
}
//发布影片 
export function sendMovie(params) {
    return request({
        url: '/api/api-crw/mockbirdnewmovie/add',
        method: 'post',
        params
    })
}

//发布影片编辑 
export function sendMovieupdate(mockbirdNewMovie) {
    return request({
        url: '/api/api-crw/mockbirdnewmovie/update',
        method: 'post',
        data:mockbirdNewMovie
    })
}

//发布影片删除 
export function sendMoviedelete(params) {
    return request({
        url: '/api/api-crw/mockbirdnewmovie/delete',
        method: 'post',
        params
    })
}

//影片状态修改
export function sendUpdateStatus(params) {
    return request({
        url: '/api/api-crw/mockbirdnewmovie/updateStatus',
        method: 'post',
        params
    })
}


//排片状态修改
export function updateStatus(params) {
    return request({
        url: '/api/api-fsch/movieinfo/updateStatus',
        method: 'post',
        params
    })
}



//查看发布任务进度
export function byFilmIdAndTabletSquareIdAndStatus(params) {
    return request({
        url: '/api/api-fsch/platoon/queryPlatoonByParams',
        method: 'post',
        params
    })
}
//拍片管理
//影片列表
export function mockbirdnewmovieQueryAll(params) {
    return request({
        url: '/api/api-crw/mockbirdnewmovie/queryAll',
        method: 'post',
        params
    })
}
//影片列表增
export function mockbirdnewmovieAdd(params) {
    return request({
        url: '/api/api-crw/mockbirdnewmovie/add',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params
    })
}
//影片列表删
export function mockbirdnewmovieDelete(params) {
    return request({
        url: '/api/api-crw/platoon/previewAndInsert',
        method: 'post',
        params
    })
}
//影片列表改
export function mockbirdnewmovieEdit(params) {
    return request({
        url: '/api/api-crw/platoon/previewAndInsert',
        method: 'post',
        params
    })
}
//排片下架
export function mockupdateStatus(params) {
    return request({
        url: '/api/api-crw/movieinfo/updateStatus',
        method: 'post',
        params
    })
}


//嘲鸟云预览
export function mockbirdCloud(platoonVo) {
    return request({
        url: '/api/api-crw/incrementPlatoon/queryListForPlatoon',
        method: 'post',
        data: platoonVo
    })
}
//发布拍片任务
export function mockbirdSend(params) {
    return request({
        url: '/api/api-crw/incrementPlatoon/addPlatoonList',
        method: 'post',
        data: params
    })
}
//发布拍片任务查看
export function mockbirdJob(params) {
    return request({
        url: '/api/api-crw/incrementPlatoon/queryOrderByFilmId',
        method: 'post',
        params
    })
}
//发布拍片任务查看订单影院列表
export function mockbirdJoblist(params) {
    return request({
        url: '/api/api-crw/incrementPlatoon/queryByOrderId',
        method: 'post',
        params
    })
}
//发布拍片任务查看订单影院列表
export function mockbirdJobstatus(params) {
    return request({
        url: '/api/api-crw/incrementPlatoon/updateStatus',
        method: 'post',
        params
    })
}

//根据影片ID获取拍片订单信息
export function queryOrderByFilmId(params) {
    return request({
        url: '/api/api-crw/incrementPlatoon/queryOrderByFilmId',
        method: 'post',
        params
    })
}

//根据订单ID和状态获取拍片订单信息
export function PlatoonqueryByOrderId(params) {
    return request({
        url: '/api/api-crw/incrementPlatoon/queryByOrderId',
        method: 'post',
        params
    })
}
//根据订单获取排片反馈图
export function FkqueryByPlatoonId(params) {
    return request({
        url: '/api/api-crw/incrementPlatoonTemporary/queryByPlatoonId',
        method: 'post',
        params
    })
}

//修改排片任务状态
export function IncrementPlatoonUpdateStatus(params) {
    return request({
        url: '/api/api-crw/incrementPlatoon/examine',
        method:'post',
        params
    })
}