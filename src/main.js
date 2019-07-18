import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
Vue.use(ElementUI)

import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import '@/view/basis'

Vue.use(VModal)


Vue.config.productionTip = false

Date.prototype.Format = function (fmt) { // author: meizz
  let o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

Vue.filter('timeInfo', function (date, symble) {
  if (!date) {
    return ''
  }
  let fmt = symble || 'yyyy.MM.dd hh:mm:ss'
  return new Date(date).Format(fmt)
})

Vue.filter('empty', function (str) {
  return str || '--'
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
