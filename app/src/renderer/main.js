import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'

import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'

import App from './App'
import routes from './routes'
import connect from 'components/connect'
const eventBus = connect.eventBus

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true

Vue.prototype.$eventBus = eventBus

const router = new Router({
  mode: 'hash',
  routes
})

new Vue({
  ...App,
  router
}).$mount('#app')
