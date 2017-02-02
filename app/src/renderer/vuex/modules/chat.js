import {} from '../mutation-types'

const state = {
  messages: [],
  viewers: 0,
  viewernames: [],
  notifications: 0,
  chatisopen: false
}

const mutations = {
  UPDATEMESSAGES (state, msg) {
    state.messages.push(msg)
  },
  CLEANMESSAGES (state, amt) {
    state.messages.splice(0, amt)
  },
  UPDATEVIEWERS (state, viewers) {
    state.viewers = viewers
  },
  UPDATEVIEWERNAMES (state, viewernames) {
    state.viewernames = viewernames
  },
  UPDATENOTIFICATIONS (state) {
    if (!state.chat) {
      state.notifications++
    }
  },
  CLEARNOTIFICATIONS (state) {
    state.notifications = 0
  },
  SETCHATSTATE (state, value) {
    state.chat = value
  }

}

export default {
  state,
  mutations
}
