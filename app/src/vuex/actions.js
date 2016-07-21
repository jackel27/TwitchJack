export const setUsername = ({ dispatch }, user) => {
  dispatch('SETUSERNAME', user)
}
export const setUserpass = ({ dispatch }, pass) => {
  dispatch('SETUSERPASS', pass)
}
export const setChannel = ({ dispatch }, ch) => {
  dispatch('SETCHANNEL', ch)
}

export const updateNotifications = ({ dispatch }, notifications) => {
  dispatch('UPDATENOTIFICATIONS', notifications)
}

export const clearNotifications = ({ dispatch }) => {
  dispatch('CLEARNOTIFICATIONS')
}

export const setOptions = ({ dispatch }, options) => {
  dispatch('UPDATEOPTIONS', options)
}

export const setChatState = ({ dispatch }, value) => {
  dispatch('SETCHATSTATE', value)
}
