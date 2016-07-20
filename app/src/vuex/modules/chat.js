import {} from '../mutation-types'

const state = {
  messages: [],
  viewers: 0,
  viewernames: [],
  notifications: 0
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
  UPDATENOTIFICATIONS (state, notification) {
    state.notifications = notification
  }
}

export default {
  state,
  mutations
}
