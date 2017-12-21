
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Routes from './routes'

require('./bootstrap')

Vue.use(Vuex)
Vue.use(VueRouter)
const store = new Vuex.Store(require('./store/index'))

const router = new VueRouter({
  routes: Routes // short for `routes: routes`
})

window.$app = new Vue({
  // el: '#app',
  store: store,
  router: router
}).$mount('#app')
