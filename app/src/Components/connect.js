import Tmi from 'tmi.js'
import store from 'src/vuex/store.js'
import {myrouter} from 'src/main.js'

let username = ''
let password = ''
let channel = ''

let client = null
let options = {}

// let viewercount = 0
let tempobject = {}

function retrieveStore () {
  username = store.state.profile.username
  password = store.state.profile.userpass
  channel = store.state.profile.channel

  options = {
    options: {
      debug: false
    },
    connection: {
      reconnect: true
    },
    identity: {
      username: username, // username
      password: password // password
    },
    channels: ['#' + channel] // ['#' + channel]
  }
}

function connect () {
  retrieveStore()
  console.log(username, password, channel)
      /*eslint-disable */
  client = new Tmi.client(options)

  client.addListener('connectfail', () => {
    console.log('connectfail')
  })

  client.addListener('connected', () => {
    console.log('Connected!')
    window.alert('You are now Connected!')
  })

  client.on('disconnected', (reason) => {
    console.log(reason)
    if(reason === 'Login unsuccessful' || reason === 'Invalid NICK.') {
      myrouter.app.$broadcast('loginfail')
    }
  })

  client.connect()
  clientOn()
      /*eslint-enable */
}

function updateMessages (msg) {
  if (store.state.chat.messages.length > 300) {
    store.dispatch('CLEANMESSAGES', 200)
  }
  store.dispatch('UPDATEMESSAGES', msg)
}
// asdf
function clientOn () {
  client.on('chat', (channel, userstate, message, self) => {
    function getEmoteName (start, end) {
      return message.substring(start, Number(end) + 1)
    }

    if (userstate.emotes) {
      let newmessage = message
      for (var key in userstate.emotes) {
        if (userstate.emotes.hasOwnProperty(key)) {
          var re = new RegExp('\\b' + getEmoteName(userstate.emotes[key][0].split('-')[0], userstate.emotes[key][0].split('-')[1]) + '\\b', 'g')
          newmessage = newmessage.replace(re, '<img src="http://static-cdn.jtvnw.net/emoticons/v1/' + key + '/1.0">')
        }
      }
      tempobject = {
        'username': userstate.username,
        'color': userstate.color,
        'message': newmessage
      }
    } else {
      tempobject = {
        'username': userstate.username,
        'color': userstate.color,
        'message': message
      }
    }
    updateMessages(tempobject)
  })
}

console.log(channel, username, password)
export default {
  connect: connect
  // viewers: viewers
}
