import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'

import './routes'

import 'bulma/css/bulma.css'
import VueAnimatedList from 'vue-animated-list'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(VueAnimatedList)
Vue.use(Electron)
Vue.use(Resource)
Vue.config.debug = true
