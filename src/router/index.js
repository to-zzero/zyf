import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../view/layout'
import Setting from '../view/setting'
import UserManagement from '../view/setting/user_management'
import Info from '../view/info'
import InfoEdit from '../view/info/info_edit'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '首页' },
    component: Layout
  },
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
        component: UserManagement
      }
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
  }
]

var router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - 服务管理系统`
  }
  next()
})

export default router;