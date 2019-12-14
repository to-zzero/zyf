/**
 * ajax请求配置
 */
import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import errors from '../errors'
import Cookies from 'js-cookie'
window.vue = Vue

// import cookie from '../../static/js/cookie.js'

axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = './api';
// axios.defaults.baseURL = '/v1/api';

const multipart_posts = ['/service/publish', '/service/update']
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (multipart_posts.includes(config.url)) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
      if (config.method.toUpperCase() === 'POST') {
        // config.data = JSON.stringify(data)
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.resultCode === "404") {
      return
    } else {
      if (response.data && response.data.error) {
        if (response.data.code === errors.NOT_LOGIN) {
          // vue.prototype.$message({ message: response.data.error, type: 'error' })
          Cookies.remove('sid')
          router.push({ path: '/login', query: {
            redirect: router.currentRoute.path
          } })
        } else {
          vue.prototype.$message({ message: response.data.error, type: 'error' })
          return Promise.reject(response.data.error);
        }
      }
      return response;
    }
  },
  error => {
    return Promise.reject(error)   // 返回接口返回的错误信息
  }
);

export const itemOperating = function (type) { // type = on, off, delete
  return axios.post('/action', {
    action: type
  })
}

import * as catalog from './catalog'

import * as service from './service'

import * as admin from './admin'

import * as serviceAuth from './serviceAuth'


export default {
  axios, catalog, service, admin, serviceAuth
};