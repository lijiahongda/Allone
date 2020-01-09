//影片管理
import request from '@/api/http.js'

//影片管理
//影片列表
export function queryAllList(params) {
    return request({
        // url: '/lpi/api-fsch/movieinfo/queryAllListByStatus',
        url: '/api/mockbirdnewmovie/queryAll',        
        method: 'post',
        params
    })
}
//发布影片 
export function sendMovie(params) {
    return request({
        url: '/api/mockbirdnewmovie/add',
        method: 'post',
        params
    })
}
//发布影片编辑 
export function sendMovieupdate(mockbirdNewMovie) {
    return request({
        url: '/api/mockbirdnewmovie/update',
        method: 'post',
        data:mockbirdNewMovie
    })
}

//影片状态修改
export function sendUpdateStatus(params) {
    return request({
        url: '/api/mockbirdnewmovie/updateStatus',
        method: 'post',
        params
    })
}


//排片状态修改
export function updateStatus(params) {
    return request({
        url: '/lpi/api-fsch/movieinfo/updateStatus',
        method: 'post',
        params
    })
}



//查看发布任务进度
export function byFilmIdAndTabletSquareIdAndStatus(params) {
    return request({
        url: '/lpi/api-fsch/platoon/queryPlatoonByParams',
        method: 'post',
        params
    })
}
//拍片管理
//影片列表
export function mockbirdnewmovieQueryAll(params) {
    return request({
        // url: '/lpi/api-fsch/movieinfo/queryListById',
        url: '/api/mockbirdnewmovie/queryAll',
        method: 'post',
        params
    })
}
//影片列表增
export function mockbirdnewmovieAdd(params) {
    return request({
        // url: '/lpi/api-fsch/platoonIntention/queryTaskById',
        url: '/api/mockbirdnewmovie/add',
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
        url: '/api/api-fsch/platoon/previewAndInsert',
        method: 'post',
        params
    })
}
//影片列表改
export function mockbirdnewmovieEdit(params) {
    return request({
        url: '/api/api-fsch/platoon/previewAndInsert',
        method: 'post',
        params
    })
}
//排片下架
export function mockupdateStatus(params) {
    return request({
        url: '/lpi/api-fsch/movieinfo/updateStatus',
        method: 'post',
        params
    })
}


//嘲鸟云预览
export function mockbirdCloud(platoonVo) {
    return request({
        url: '/api/incrementPlatoon/queryListForPlatoon',
        method: 'post',
        data: platoonVo
    })
}
//发布拍片任务
export function mockbirdSend(params) {
    return request({
        url: '/api/incrementPlatoon/addPlatoonList',
        method: 'post',
        data: params
    })
}
//发布拍片任务查看
export function mockbirdJob(params) {
    return request({
        url: '/api/incrementPlatoon/queryOrderByFilmId',
        method: 'post',
        params
    })
}
//发布拍片任务查看订单影院列表
export function mockbirdJoblist(params) {
    return request({
        url: '/api/incrementPlatoon/queryByOrderId',
        method: 'post',
        params
    })
}
//发布拍片任务查看订单影院列表
export function mockbirdJobstatus(params) {
    return request({
        url: '/api/incrementPlatoon/updateStatus',
        method: 'post',
        params
    })
}