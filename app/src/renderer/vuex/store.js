import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  actions,
  modules,
  strict: true
})
