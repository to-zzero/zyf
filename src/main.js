import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import ElementUI  from 'element-ui'
import router from './router'

Vue.use(ElementUI)

import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import '@/view/basis'

Vue.use(VModal)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
