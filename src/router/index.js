import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../view/layout'
import Setting from '../view/setting'
import CatalogManagement from '../view/setting/catalog_management'
import Info from '../view/info'
import InfoEdit from '../view/info/info_edit'
import Cookies from 'js-cookie'
import { Loading } from 'element-ui';
import Login from '../view/login'
import Register from '../view/register'
import AuthService from '../view/auth-service'
import Users from '../view/users'
import SystemLog from '../view/setting/admin_log'
import ServiceLog from '../view/setting/service_log'

const COOKIE_KEY_TOKEN = "sid"
const LOGIN_PAGE_NAME = 'login'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '首页' },
    component: Layout
  },
  {
    path: `/${LOGIN_PAGE_NAME}`,
    name: LOGIN_PAGE_NAME,
    meta: { title: "登录" },
    component: Login
  },
  // {
  //   path: `/register`,
  //   name: 'Register',
  //   meta: { title: "注册" },
  //   component: Register
  // },
  {
    path: '/setting',
    name: 'Setting',
    meta: { title: '系统配置' },
    component: Setting,
    redirect: '/setting/catalog',
    children: [
      {
        path: 'catalog',
        meta: { title: '服务目录' },
        name: 'UserManagement',
        component: CatalogManagement
      }, {
        path: 'authservice',
        meta: { title: '服务授权' },
        component: AuthService
      },
      {
        path: 'users',
        meta: { title: '用户管理' },
        component: Users
      },
      {
        path: 'systemlog',
        meta: { title: '系统日志' },
        component: SystemLog
      },
      {
        path: 'servicelog',
        meta: { title: '服务日志' },
        component: ServiceLog
      },
    ]
  },
  {
    path: '/info',
    name: 'Info',
    meta: { title: '查看服务详情' },
    component: Info
  },
  {
    path: '/info_edit',
    meta: { title: '编辑服务信息' },
    name: 'InfoEdit',
    component: InfoEdit
  }, {
    path: '*',
    redirect: '/'
  }
]

var router = new Router({
  routes
})

window.jsCookie = Cookies

router.beforeEach((to, from, next) => {
  // Loading.service({ fullscreen: true, text: '正在打开...' })

  let token = Cookies.get(COOKIE_KEY_TOKEN)
  if (!token) { // 未登录且要跳转的页面不是登录页
    if (to.name != LOGIN_PAGE_NAME) {
      next({
        name: LOGIN_PAGE_NAME
      })
    } else {// 未登陆且要跳转的页面是登录页
      next()
    }
  } else { // 已登录且要跳转的页面是登录页
    if (to.name == LOGIN_PAGE_NAME) {
      next({
        name: 'Home'
      })
    } else {
      next()
    }
  }
})

router.afterEach(to => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - 服务管理系统`
  }
  // Loading.service({ fullscreen: true }).close()
})

export default router;