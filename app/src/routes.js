import Vue from 'vue'

export default {
  '/': {
    component: Vue.component('main-view', require('./components/MainView')),
    name: 'main-view'
  }
}
