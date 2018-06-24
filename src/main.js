import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

/**
 * Axios wrapper for api
 */
import apiWrapper from './plugins/apiWrapper'
import VueCookie from 'vue-cookie'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(apiWrapper)
Vue.use(VueCookie)

new Vue({
  el: '#app',
  render: h => h(App)
})
