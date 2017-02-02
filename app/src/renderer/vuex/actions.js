export const setUsername = ({ commit }, user) => {
  commit('SETUSERNAME', user)
}
export const setUserpass = ({ commit }, pass) => {
  commit('SETUSERPASS', pass)
}
export const setChannel = ({ commit }, ch) => {
  commit('SETCHANNEL', ch)
}

export const updateNotifications = ({ commit }) => {
  commit('UPDATENOTIFICATIONS')
}

export const clearNotifications = ({ commit }) => {
  commit('CLEARNOTIFICATIONS')
}

export const setOptions = ({ commit }, options) => {
  commit('UPDATEOPTIONS', options)
}

export const setChatState = ({ commit }, value) => {
  commit('SETCHATSTATE', value)
}
