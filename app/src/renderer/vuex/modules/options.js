import {} from '../mutation-types'

const state = {
  options: {
    rememberme: false,
    hotkeys: {
      expandchat: null,
      quit: null,
      viewerlist: null,
      disconnect: null
    }
  }
}

const mutations = {
  UPDATEOPTIONS (state, options) {
    state.options = options
  }
}

export default {
  state,
  mutations
}
