export function counters (state) {
  return state.counters.all
}

export function getUsername (state) {
  return state.profile.username
}

export function getUserpass (state) {
  return state.profile.userpass
}

export function getChannel (state) {
  return state.profile.channel
}

export function getOptions (state) {
  return state.options.options
}

export function getNotifications (state) {
  return state.chat.notifications
}

export function getChat (state) {
  return state.chat.messages
}
