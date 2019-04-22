// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import VueResource from 'vue-resource'
import Moment from 'moment'
import store from './store/store'
import axios from './http'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.prototype.$moment = Moment;//赋值使用
Vue.prototype.axios = axios;

new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
