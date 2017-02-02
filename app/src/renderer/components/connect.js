import store from 'renderer/vuex/store.js'
import Tmi from 'tmi.js'
import Vue from 'vue'

const eventBus = new Vue()

let username = ''
let password = ''
let channel = ''

let client = null
let options = {}

let viewerobj = {}
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
      password: password
    },
    channels: ['#' + channel.toLowerCase()] // ['#' + channel]
  }
}

function connect () {
  retrieveStore()
  console.log(username, password, channel)
 /* eslint-disable */
  client = new Tmi.client(options)
   /* eslint-enable */

  client.addListener('connectfail', () => {
    console.log('connectfail')
  })

  client.addListener('connected', () => {
    console.log('Connected!')
    eventBus.$emit('connected')
  })

  client.on('disconnected', (reason) => {
    console.log(reason)
    if (reason === 'Login unsuccessful' || reason === 'Invalid NICK.' || reason === 'Connection closed.') {
      eventBus.$emit('loginfail')
    }
  })

  client.connect()
  clientOn()
}

function updateMessages (msg) {
  eventBus.$emit('newmessage')
  store.dispatch('updateNotifications')
  if (store.state.chat.messages.length > 300) {
    store.commit('CLEANMESSAGES', 200)
  }
  store.commit('UPDATEMESSAGES', msg)
}
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

function disconnect () {
  eventBus.$emit('loginfail')
  if (client) {
    client.disconnect().then((data) => {
    }).catch((err) => {
      console.log(err)
    })
  }
}

function getviewers () {
  Vue.http.get('https://tmi.twitch.tv/group/user/' + channel.toLowerCase() + '/chatters').then((response) => {
    viewerobj = response.data.chatters.viewers
  }, (error) => {
    console.log(error)
    viewerobj.viewers = null
  })
  return viewerobj
}

function saymessage (msg) {
  client.say(channel, msg)
}

export default {
  connect: connect,
  disconnect: disconnect,
  viewers: getviewers,
  message: saymessage,
  eventBus
}
