export const setUsername = ({ dispatch }, user) => {
  dispatch('SETUSERNAME', user)
}
export const setUserpass = ({ dispatch }, pass) => {
  dispatch('SETUSERPASS', pass)
}
export const setChannel = ({ dispatch }, ch) => {
  dispatch('SETCHANNEL', ch)
}

export const setNotifications = ({ dispatch }, notifications) => {
  dispatch('UPDATENOTIFICATIONS', notifications)
}

export const setOptions = ({ dispatch }, options) => {
  dispatch('UPDATEOPTIONS', options)
}
