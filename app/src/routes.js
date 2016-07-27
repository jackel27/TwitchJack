// import Vue from 'vue'

export default {

  '/': {
    name: 'landing',
    component: (resolve) => {
      require('./components/Landing', resolve)
    }
  },

  '/connect': {
    name: 'launch',
    component: (resolve) => {
      require('./components/Launch', resolve)
    }
  },

  '/settings': {
    name: 'settings',
    component: (resolve) => {
      require('./components/Settings', resolve)
    }
  },

  '/connected-menu': {
    name: 'connected-menu',
    component: (resolve) => {
      require('./components/connected-menu', resolve)
    }
  }
}
// '/': {
//   component: Vue.component('landing', require('./components/Landing')),
//   name: 'landing'
// },
// '/connect': {
//   component: Vue.component('launch', require('./components/Launch')),
//   name: 'launch'
// },
// '/settings': {
//   component: Vue.component('settings', require('./components/Settings')),
//   name: 'settings'
// },
// '/connected-menu': {
//   component: Vue.component('connected-menu', require('./components/ConnectedMenu')),
//   name: 'connected-menu'
// }
