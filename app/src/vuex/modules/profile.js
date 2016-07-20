import {} from '../mutation-types'

const state = {
  username: null,
  userpass: null,
  channel: null
}

const mutations = {
  SETUSERNAME (state, user) {
    state.username = user
  },
  SETUSERPASS (state, pass) {
    state.userpass = pass
  },
  SETCHANNEL (state, ch) {
    state.channel = ch
  }
}

export default {
  state,
  mutations
}
