/**
 * ajax请求配置
 */
import axios from 'axios'

// import cookie from '../../static/js/cookie.js'

axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseUrl = '/v1/api/services';

//整理数据
axios.defaults.transformRequest = function (data) {
  data = JSON.stringify(data);
  return data;
};

// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.resultCode=="404") {
      console.log("response.data.resultCode是404")
      return
    }else{
      return response;
    }
  },
  error => {
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  }
);

export const getMenuList = function () {
  return axios.post('/categroy')
}

export const getContentList = function (body) {
  return axios.post('/list', {
    token: '',
    uuid: '',
    sort: 'visit',
    a2z: true,
    query: '',
    page: body.page,
    size: body.size
  })
}

export const itemOperating = function (type) { // type = on, off, delete
  return axios.post('/action', {
    action: type
  })
}

export default axios;