import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 添加IE兼容
import '@babel/polyfill'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'

import App from './App.vue'
import VueAMap from 'vue-amap'
import waterfall from 'vue-waterfall2'
import VueLazyload from 'vue-lazyload'
// import { version } from 'echarts/lib/echarts'
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts')
// vue全局注入echarts
Vue.prototype.$echarts = echarts
// 将axios挂载在Vue扩展上
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api/'
axios.defaults.timeout = 7000

Vue.use(element)
Vue.use(VueAMap)
Vue.use(waterfall)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})
// eslint-disable-next-line

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
