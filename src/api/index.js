/**
 * ajax请求配置
 */
import axios from 'axios'

// import cookie from '../../static/js/cookie.js'

axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = '/v1/api';

//整理数据
// axios.defaults.transformRequest = function (data) {
//   data = JSON.stringify(data);
//   return data;
// };

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if(config.url==='/service/publish'){
      config.headers['Content-Type'] = 'multipart/form-data';
    }else{
      config.headers['Content-Type'] = 'application/json';
      if (config.method.toUpperCase() === 'POST') {
        // config.data = JSON.stringify(data)
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.resultCode === "404") {
      return
    } else {
      return response;
    }
  },
  error => {
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  }
);

export const itemOperating = function (type) { // type = on, off, delete
  return axios.post('/action', {
    action: type
  })
}

import * as catalog from './catalog'

import * as service from './service'

export default {
  axios, catalog, service
};