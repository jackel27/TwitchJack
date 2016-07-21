import Vue from 'vue'

export default {
  '/': {
    component: Vue.component('landing', require('./components/Landing')),
    name: 'landing'
  },
  '/connect': {
    component: Vue.component('launch', require('./components/Launch')),
    name: 'launch'
  },
  '/settings': {
    component: Vue.component('settings', require('./components/Settings')),
    name: 'settings'
  },
  '/connected-menu': {
    component: Vue.component('connected-menu', require('./components/ConnectedMenu')),
    name: 'connected-menu'
  }
}
