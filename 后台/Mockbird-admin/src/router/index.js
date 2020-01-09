import Vue from 'vue';
import Router from 'vue-router';
import { SSL_OP_SINGLE_DH_USE } from 'constants';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: {
            title: '自述文件',
            keepAlive: true // 需要被缓存
        },
        children: [{
            path: '/dashboard',
            component: resolve => require(['../components/page/Dashboard.vue'], resolve),
            meta: {
                title: '系统首页',
                keepAlive: false // 需要被缓存
            }
        },
        //系统
        {
            path: '/Menu',
            component: resolve => require(['../components/page/system/Menu.vue'], resolve),
            meta: {
                title: '菜单',
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/Role',
            component: resolve => require(['../components/page/system/Role.vue'], resolve),
            meta: {
                title: '角色',
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/Authority',
            component: resolve => require(['../components/page/system/Authority.vue'], resolve),
            meta: {
                title: '权限',
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/ClientManagement',
            component: resolve => require(['../components/page/system/ClientManagement.vue'], resolve),
            meta: {
                title: 'client管理',
                keepAlive: true // 需要被缓存
            }
        },
        //用户管理
        {
            path: '/Userquery',
            component: resolve => require(['../components/page/userManagement/Userquery.vue'], resolve),
            meta: {
                title: '用户查询',
                keepAlive: true // 需要被缓存
            }
        },
        //用户审核
        {
            path: '/Useraudit',
            component: resolve => require(['../components/page/userManagement/Useraudit.vue'], resolve),
            meta: {
                title: '用户审核',
                keepAlive: true // 需要被缓存
            }
        },
        //文件查询
        {
            path: '/Filequery',
            component: resolve => require(['../components/page/views/Filequery.vue'], resolve),
            meta: {
                title: '文件查询',
                keepAlive: true // 需要被缓存
            }
        },
        //邮件管理
        {
            path: '/Mailmanagement',
            component: resolve => require(['../components/page/views/Mailmanagement.vue'], resolve),
            meta: {
                title: '邮件管理',
                keepAlive: true // 需要被缓存
            }
        },
        //注册中心
        {
            path: '/RegistryCenter',
            component: resolve => require(['../components/page/views/RegistryCenter.vue'], resolve),
            meta: {
                title: '注册中心',
                keepAlive: true // 需要被缓存
            }
        },
        //监控中心
        {
            path: '/monitoringCenter',
            component: resolve => require(['../components/page/views/monitoringCenter.vue'], resolve),
            meta: {
                title: '监控中心',
                keepAlive: true // 需要被缓存
            }
        },
        //接口文档
        {
            path: '/Interfacedocument',
            component: resolve => require(['../components/page/views/Interfacedocument.vue'], resolve),
            meta: {
                title: '接口文档',
                keepAlive: true // 需要被缓存
            }
        },
        //黑名单IP
        {
            path: '/Blacklist',
            component: resolve => require(['../components/page/views/Blacklist.vue'], resolve),
            meta: {
                title: '黑名单IP',
                keepAlive: true // 需要被缓存
            }
        },
        //日志查询
        {
            path: '/Logquery',
            component: resolve => require(['../components/page/views/Logquery.vue'], resolve),
            meta: {
                title: '日志查询',
                keepAlive: true // 需要被缓存
            }
        },
        //短信历史查询
        {
            path: '/SMSquery',
            component: resolve => require(['../components/page/views/SMSquery.vue'], resolve),
            meta: {
                title: '短信历史查询',
                keepAlive: true // 需要被缓存
            }
        },
        //CMS管理
        //文章类型
        {
            path: '/CMStype',
            component: resolve => require(['../components/page/CMS/CMStype.vue'], resolve),
            meta: {
                title: '文章类型',
                keepAlive: true // 需要被缓存
            }
        },
        //文章列表
        {
            path: '/CMSlist',
            component: resolve => require(['../components/page/CMS/CMSlist.vue'], resolve),
            meta: {
                title: '文章列表',
                keepAlive: true // 需要被缓存
            }
        },
        //院线管理
        {
            path: '/LineManagement',
            component: resolve => require(['../components/page/views/LineManagement.vue'], resolve),
            meta: {
                title: '院线管理',
                keepAlive: true // 需要被缓存
            }
        },
        //影院管理
        {
            path: '/CinemaManagement',
            component: resolve => require(['../components/page/views/CinemaManagement.vue'], resolve),
            meta: {
                title: '影院管理',
                keepAlive: true // 需要被缓存
            }
        },
        //广告管理
        //广告类型
        {
            path: '/Advtype',
            component: resolve => require(['../components/page/AdvertisingManagement/Advtype.vue'], resolve),
            meta: {
                title: '广告类型',
                keepAlive: true // 需要被缓存
            }
        },
        //广告列表
        {
            path: '/Advlist',
            component: resolve => require(['../components/page/AdvertisingManagement/Advlist.vue'], resolve),
            meta: {
                title: '广告列表',
                keepAlive: true // 需要被缓存
            }
        },
        //平台广告
        //简单广告
        {
            path: '/Pushadv',
            component: resolve => require(['../components/page/PushAdv/PushManage.vue'], resolve),
            meta: {
                title: '嘲鸟广告',
                keepAlive: true // 需要被缓存
            }
        },
        //排片管理
         //排片订单
         {
            path: '/OrderSheet',
            component: resolve => require(['../components/page/LayoutManagement/OrderSheet.vue'], resolve),
            meta: {
                title: '排片订单',
                keepAlive: true // 需要被缓存
            }
        },
         //发布排片
         {
            path: '/ReleaseLayout',
            component: resolve => require(['../components/page/LayoutManagement/ReleaseLayout.vue'], resolve),
            meta: {
                title: '发布排片',
                keepAlive: true // 需要被缓存
            }
        },
        //排片任务列表
        {
            path: '/ListOFtasks',
            component: resolve => require(['../components/page/LayoutManagement/ListOFtasks.vue'], resolve),
            meta: {
                title: '排片任务列表',
                keepAlive: true // 需要被缓存
            }
        },
        //排片订单列表
        {
            path: '/ListOFtasksdetail',
            name: 'ListOFtasksdetail_dd',
            component: resolve => require(['../components/page/LayoutManagement/ListOFtasksdetail.vue'], resolve),
            meta: {
                title: '排片订单列表',
                keepAlive: false // 需要被缓存
            }
        },
        //企业管理
        {
            path: '/Businessmanagement',
            component: resolve => require(['../components/page/views/Businessmanagement.vue'], resolve),
            meta: {
                title: '企业管理',
                keepAlive: true // 需要被缓存
            }
        },
        //Banner管理
        {
            path: '/Banner',
            component: resolve => require(['../components/page/views/banner.vue'], resolve),
            meta: {
                title: 'Banner管理',
                keepAlive: true // 需要被缓存
            }
        },
        //公司库
        {
            path: '/Companylibrary',
            component: resolve => require(['../components/page/views/Companylibrary.vue'], resolve),
            meta: {
                title: '公司库',
                keepAlive: true // 需要被缓存
            }
        },
        //影人库
        {
            path: '/FilmGallery',
            component: resolve => require(['../components/page/views/FilmGallery.vue'], resolve),
            meta: {
                title: '影人库',
                keepAlive: true // 需要被缓存
            }
        },
        //数据统计
        //票房统计
        {
            path: '/boxOffice',
            component: resolve => require(['../components/page/statistics/boxOffice.vue'], resolve),
            meta: {
                title: '票房统计',
                keepAlive: true // 需要被缓存
            }
        },
        //排片数据
        {
            path: '/ChipFormation',
            component: resolve => require(['../components/page/statistics/ChipFormation.vue'], resolve),
            meta: {
                title: '排片数据',
                keepAlive: true // 需要被缓存
            }
        },
        //订单管理
        //院方订单
        {
            path: '/Cinemaside',
            component: resolve => require(['../components/page/Ordermanagement/Cinemaside.vue'], resolve),
            meta: {
                title: '院方订单',
                keepAlive: true // 需要被缓存
            }
        },
        //片方订单
        {
            path: '/Producer',
            component: resolve => require(['../components/page/Ordermanagement/Producer.vue'], resolve),
            meta: {
                title: '片方订单',
                keepAlive: true // 需要被缓存
            }
        },
        //数据录入
        //艺恩数据录入
        {
            path: '/Eunen',
            component: resolve => require(['../components/page/Dataentry/Eunen.vue'], resolve),
            meta: {
                title: '艺恩数据录入',
                keepAlive: true // 需要被缓存
            }
        },
        //餐饮云屏数据录入
        {
            path: '/catering',
            component: resolve => require(['../components/page/Dataentry/Catering.vue'], resolve),
            meta: {
                title: '餐饮云屏数据录入',
                keepAlive: true // 需要被缓存
            }
        },
        //影院院线数据录入
        {
            path: '/Cinemacinema',
            component: resolve => require(['../components/page/Dataentry/Cinemacinema.vue'], resolve),
            meta: {
                title: '影院院线数据录入',
                keepAlive: true // 需要被缓存
            }
        },
        //宣发预算表
        {
            path: '/Declarehair',
            component: resolve => require(['../components/page/Dataentry/Declarehair.vue'], resolve),
            meta: {
                title: '宣发预算表',
                keepAlive: true // 需要被缓存
            }
        },
        //物料管理
        {
            path: '/materialmanagement',
            component: resolve => require(['../components/page/views/materialmanagement.vue'], resolve),
            meta: {
                title: '物料管理',
                keepAlive: true // 需要被缓存
            }
        },
        //banner管理
        {
            path: '/banner',
            component: resolve => require(['../components/page/views/banner.vue'], resolve),
            meta: {
                title: 'banner管理',
                keepAlive: true // 需要被缓存
            }
        },
        //影片管理
        //影片列表
        {
            path: '/Movielist',
            component: resolve => require(['../components/page/Filmmanagement/Movielist.vue'], resolve),
            meta: {
                title: '影片列表',
                keepAlive: true // 需要被缓存
            }
        },
        //星空投放资源管理
        //星空投放列表
        {
            path: '/StarAunch',
            component: resolve => require(['../components/page/StarDelivery/StarAunch.vue'], resolve),
            meta: {
                title: '星空投放',
                keepAlive: true // 需要被缓存
            }
        },
        //星空云屏列表
        {
            path: '/StarrySky',
            component: resolve => require(['../components/page/StarDelivery/StarrySky.vue'], resolve),
            meta: {
                title: '星空云屏',
                keepAlive: true // 需要被缓存
            }
        },
        //积分管理（主）
        //星空投放列表
        {
            path: '/integralist',
            component: resolve => require(['../components/page/Integralmanagement/indexlist.vue'], resolve),
            meta: {
                title: '积分列表',
                keepAlive: true // 需要被缓存
            }
        },
        //餐饮云屏列表
        {
            path: '/Restaurant',
            component: resolve => require(['../components/page/StarDelivery/Restaurant.vue'], resolve),
            meta: {
                title: '餐饮云屏',
                keepAlive: true // 需要被缓存
            }
        },
        //消息
        {
            path: '/mbmessage',
            component: resolve => require(['../components/page/views/Messages.vue'], resolve),
            meta: {
                title: '消息',
                keepAlive: true // 需要被缓存
            }
        },
        //积分管理
        {
            path: '/integralmanagement',
            component: resolve => require(['../components/page/views/Integralmanagement.vue'], resolve),
            meta: {
                title: '积分管理',
                keepAlive: true // 需要被缓存
            }
        },
        //交易记录
        //充值记录
        {
            path: '/charecharge',
            component: resolve => require(['../components/page/Recharge/chaRecharge.vue'], resolve),
            meta: {
                title: '充值记录',
                keepAlive: true // 需要被缓存
            }
        },
        //提现记录
        {
            path: '/turecharge',
            component: resolve => require(['../components/page/Recharge/tuRecharge.vue'], resolve),
            meta: {
                title: '提现记录',
                keepAlive: true // 需要被缓存
            }
        },
        //demo
        {
            path: '/icon',
            component: resolve => require(['../components/page/Icon.vue'], resolve),
            meta: {
                title: 'idco',
                keepAlive: true // 需要被缓存
            }
        },
        //错误页面
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve),
            meta: {
                title: '404',
                keepAlive: true // 需要被缓存
            }
        },
        //未授权页面
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve),
            meta: {
                title: '403',
                keepAlive: true // 需要被缓存
            }
        },
        //其他扩展
        //发布文章界面
        {
            path: '/cbook',
            component: resolve => require(['../components/page/CMS/detail/cosBook.vue'], resolve),
            meta: {
                title: '发布文章',
                keepAlive: false // 不需要被缓存
            }
        },
        //文章详情界面
        {
            path: '/cbookdetail',
            name: 'cbookdetail_cms',
            component: resolve => require(['../components/page/CMS/detail/Bookdetail.vue'], resolve),
            meta: {
                title: '文章详情',
                keepAlive: false // 不需要被缓存
            }
        },
        //文章编辑界面
        {
            path: '/cbookedit',
            name: 'cbookedit_cms',
            component: resolve => require(['../components/page/CMS/detail/Bookedit.vue'], resolve),
            meta: {
                title: '文章编辑',
                keepAlive: false // 不需要被缓存
            }
        },
        //消息提示界面
        {
            path: '/tabs',
            component: resolve => require(['../components/page/Tabs.vue'], resolve),
            meta: {
                title: '消息提示',
                keepAlive: false // 不需要被缓存
            }
        }
        ]
    },
    //登陆
    {
        path: '/login',
        component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    //重定向
    {
        path: '*',
        redirect: '/404'
    }
    ]
})
