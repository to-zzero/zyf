/**
 * ajax请求配置
 */
import axios from 'axios'

// import cookie from '../../static/js/cookie.js'

axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = '/v1/api';

//整理数据
axios.defaults.transformRequest = function (data) {
  data = JSON.stringify(data);
  return data;
};

// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
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

export { catalog_list, save_catalog, add_services, remove_services } from './catalog'

export { servie_list } from './service'

export default axios;