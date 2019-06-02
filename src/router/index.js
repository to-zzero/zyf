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
    component: Layout
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    children: [
      {
        path: 'catalog',
        name: 'UserManagement',
        component: UserManagement
      }
    ]
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/info_edit',
    name: 'InfoEdit',
    component: InfoEdit
  }
]

export default new Router({
  routes
})