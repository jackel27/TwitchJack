import Tmi from 'tmi.js'
let { username, key } = require('../../credentials.json')

let channel = null

function setOptions (name) {
  channel = name
}
var options = {
  options: {
    debug: false
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: username,
    password: key
  },
  channels: channel
}
      /*eslint-disable */
const client = new Tmi.client(options)
      /*eslint-enable */
export default {
  client: client,
  changech: changeChannel
}
