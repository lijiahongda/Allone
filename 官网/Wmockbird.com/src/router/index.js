import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '*',
    redirect: '/'
  }, {
    path: '/',
    name: 'PageView',
    component: resolve => require(['@/view/PageView'], resolve),
    children: [{
        path: '/',
        redirect: '/home'
      }, {
        path: '/home',
        name: 'home',
        component: resolve => require(['@/view/HomePage'], resolve),
        meta: {
          title: '首页'
        }
      }, {
        path: '/software',
        name: 'software',
        component: resolve => require(['@/view/Software'], resolve),
        meta: {
          title: '软件产品'
        },
        children: [{
            path: '/software',
            redirect: '/software/smartTown'
          },
          {
            path: '/software/smartTown',
            name: 'software',
            component: resolve => require(['@/view/Software_smartTown'], resolve),
            meta: {
              title: '软件产品丨智能小镇管理系统'
            }
          },
          {
            path: '/software/bigData',
            name: 'software',
            component: resolve => require(['@/view/Software_bigData'], resolve),
            meta: {
              title: '软件产品丨大数据管理系统'
            }
          }
        ]
      }, {
        path: '/service',
        name: 'service',
        component: resolve => require(['@/view/Service'], resolve),
        meta: {
          title: '扶持政策'
        }
      },
      {
        path: '/dongta',
        name: 'Dongta',
        component: resolve => require(['@/view/Dongta'], resolve),
        meta: {
          title: '产业园动态'
        }
      },
      {
        path: '/whufin',
        name: 'Whufin',
        component: resolve => require(['@/view/Whufin'], resolve),
        meta: {
          title: '芜湖景区'
        }
      },
      {
        path: '/newsinformation',
        name: 'newsinformation',
        component: resolve => require(['@/view/NewsInformation'], resolve),
        meta: {
          title: '新闻动态'
        }
      }, {
        path: '/companyintroduction',
        name: 'companyintroduction',
        component: resolve => require(['@/view/CompanyIntroduction'], resolve),
        meta: {
          title: '公司介绍'
        }
      }, {
        path: '/jobchance',
        name: 'jobchance',
        component: resolve => require(['@/view/JobChance'], resolve),
        meta: {
          title: '入驻企业'
        }
      },
      {
        path: '/bjbd',
        name: 'bjbd',
        component: resolve => require(['@/view/Bjbd'], resolve),
        meta: {
          title: '北京北电影视艺术学院'
        }
      },
      {
        path: '/contactus',
        name: 'contactus',
        component: resolve => require(['@/view/ContactUs'], resolve),
        meta: {
          title: '联系我们'
        }
      },
      {
        path: '/servicedetail',
        name: 'servicedetail',
        component: resolve => require(['@/view/ServiceDetail'], resolve),
        meta: {
          title: '相关服务'
        }
      },
      {
        path: '/news1',
        name: 'news1',
        component: resolve => require(['@/news/news1'], resolve),
        meta: {
          title: '产业园动态'
        }
      },
      {
        path: '/news2',
        name: 'news2',
        component: resolve => require(['@/news/news2'], resolve),
        meta: {
          title: '产业园动态'
        }
      },
      {
        path: '/news3',
        name: 'news3',
        component: resolve => require(['@/news/news3'], resolve),
        meta: {
          title: '产业园动态'
        }
      },
      {
        path: '/news4',
        name: 'news4',
        component: resolve => require(['@/news/news4'], resolve),
        meta: {
          title: '产业园动态'
        }
      },
      {
        path: '/news5',
        name: 'news5',
        component: resolve => require(['@/news/news5'], resolve),
        meta: {
          title: '产业园动态'
        }
      },
      {
        path: '/news6',
        name: 'news6',
        component: resolve => require(['@/news/news6'], resolve),
        meta: {
          title: '产业园动态'
        }
      },
      {
        path: '/news7',
        name: 'news7',
        component: resolve => require(['@/news/news7'], resolve),
        meta: {
          title: '产业园动态'
        }
      },
      {
        path: '/news8',
        name: 'news8',
        component: resolve => require(['@/news/news8'], resolve),
        meta: {
          title: '产业园动态'
        }
      },
      {
        path: '/news9',
        name: 'news9',
        component: resolve => require(['@/news/news9'], resolve),
        meta: {
          title: '产业园动态'
        }
      },
      {
        path: '/news10',
        name: 'news10',
        component: resolve => require(['@/news/news10'], resolve),
        meta: {
          title: '产业园动态'
        }
      },
      {
        path: '/news11',
        name: 'news11',
        component: resolve => require(['@/news/news11'], resolve),
        meta: {
          title: '产业园动态'
        }
      }
    ]
  }]
})
