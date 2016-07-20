<template>
 <div class="columns is-gapless is-mobile" v-bind:style="{ flexDirection: flexdirection }">
   <main-panel></main-panel>
   <chat-panel></chat-panel>
  </div>
</template>
<script>
  // import Tmi from 'tmi.js'
  //
  // let { username, key } = require('../../credentials.json')
  import { getUsername, getUserpass, getChannel } from '../vuex/getters'
  import { setUsername, setUserpass, setChannel } from '../vuex/actions'
  import MainPanel from './MainPanel'
  import ChatPanel from './ChatPanel'
  import tmiconnect from './tmiconnect.js'
  export default {
    vuex: {
      getters: {
        getusername: getUsername,
        getuserpass: getUserpass,
        getchannel: getChannel
      },
      actions: {
        setusername: setUsername,
        setuserpass: setUserpass,
        setchannel: setChannel
      }
    },
    components: {
      MainPanel,
      ChatPanel
    },
    data () {
      return {
        username: this.getusername,
        password: this.getuserpass,
        channels: this.getchannel,
        mymessage: '',
        messagegroup: [],
        sendmessage: '',
        client: null,
        viewers: 0,
        notifications: 0,
        slideropened: false,
        streamtime: 0,
        rightside: false,
        expanded: true,
        flexdirection: 'row',
        clientimg: 'http://momdadapp.com/Images/GlitchIcon_white.png' // default image if no image exists
      }
    },
    ready () {
      this.chat()
      this.getclientimg()
      setInterval(this.getusers, 10000)
      this.$electron.remote.getCurrentWindow().on('move', (event) => {
        // console.log(window.screenX)
      })
      window.onbeforeunload = (event) => {
        this.$electron.remote.getCurrentWindow().webContents.removeAllListeners()
        console.log('remove all listeners')
      }
    },
    methods: {
      sendmymessage () {
        this.client.say(this.channels, this.sendmessage)
      },
      getclientimg () {
        this.$http.get('https://api.twitch.tv/kraken/users/' + this.username).then((response) => {
          console.log(response.data.logo)
          if (response.data.logo) { // If user has a logo, apply it, if not, apply default image
            this.clientimg = response.data.logo
          } else {
            this.clientimg = 'http://momdadapp.com/Images/GlitchIcon_white.png'
          }
        }).then((error) => {
          console.log(error) // handle error if user cannot be retrieved...
        })
      },
      getusers () { // Retrieve viewers
        this.$http.get('https://tmi.twitch.tv/group/user/' + this.channels.substring(1) + '/chatters').then((response) => {
          this.viewers = response.data.chatters.viewers.length
        }, (error) => {
          this.viewers = 0
          console.log(error)
        })
      },
      chat () {
        let tempobject = {}
        /*eslint-disable */
        // tmiconnect.changech(this.channels)
        this.client = tmiconnect.client
        // Connect the client to the server..
        this.client.connect()
        /*eslint-enable */
        // end of tmi.js
        this.client.on('chat', (channel, userstate, message, self) => {
          if (!this.expanded) {
            this.notifications++
          }
          console.log('SELF IS = ' + self)
          console.log(userstate)
          // Do the rest...
          function getEmoteName (start, end) {
            return message.substring(start, Number(end) + 1)
          }
          if (userstate.emotes) {
            var newmessage = message
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
          this.pushmessage(tempobject)
        })
      },
      expand () {
      },
      pushmessage (msg) {
        var objDiv = document.getElementById('chatwin')
        var isScrolledToBottom = objDiv.scrollHeight - objDiv.clientHeight <= objDiv.scrollTop + 60
        if (isScrolledToBottom) {
          this.messagegroup.push(msg)
          setTimeout(() => {
            objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight
          }, 10)
        } else {
          this.messagegroup.push(msg)
        }
        // clean up messages to prevent lag
        if (this.messagegroup.length > 300) {
          this.messagegroup.splice(0, 200)
        }
      }
    },
    name: 'main-view'
  }
</script>
