<template>
 <div class="columns is-gapless is-mobile" v-bind:style="{ flexDirection: flexdirection }">
   <main-panel></main-panel>
   <chat-panel></chat-panel>
  </div>
</template>
<script>
  import Tmi from 'tmi.js'
  let { username, key } = require('../../credentials.json')
  import MainPanel from './MainPanel'
  import ChatPanel from './ChatPanel'
  export default {
    components: {
      MainPanel,
      ChatPanel
    },
    data () {
      return {
        username: username,
        password: key,
        channels: ['#freecodecamp'], // Change as desired
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
        flexdirection: 'row-reverse',
        clientimg: 'http://momdadapp.com/Images/GlitchIcon_white.png' // default image if no image exists
      }
    },
    ready () {
      this.chat()
      this.getclientimg()
      setInterval(this.getusers, 10000)
      this.$electron.remote.getCurrentWindow().on('move', (event) => {
        this.onmove(true)
        // console.log(window.screenX)
        if (this.expanded) {
          this.flexdirection = (window.screenX + (this.$electron.remote.getCurrentWindow().getContentSize()[0] / 2) < (screen.width / 2)) ? 'row' : 'row-reverse'
        }
        this.rightside = (window.screenX + (this.$electron.remote.getCurrentWindow().getContentSize()[0] / 2) < (screen.width / 2)) ? 'no' : 'yes'
      })
      window.onbeforeunload = (event) => {
        this.$electron.remote.getCurrentWindow().webContents.removeAllListeners()
        console.log('remove all listeners')
      }
    },
    methods: {
      sendmymessage () {
        this.client.say(this.channels[0], this.sendmessage)
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
        this.$http.get('https://tmi.twitch.tv/group/user/' + this.channels[0].substring(1) + '/chatters').then((response) => {
          this.viewers = response.data.chatters.viewers.length
        }, (error) => {
          this.viewers = 0
          console.log(error)
        })
      },
      chat () {
        let tempobject = {}
        /*eslint-disable */
        var options = {
          options: {
            debug: false
          },
          connection: {
            reconnect: true
          },
          identity: {
            username: this.username,
            password: this.password
          },
          channels: this.channels
        }
        const client = new Tmi.client(options)
        this.client = client

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
      onmove (move = false) {
        let xpos = window.screenX
        let ypos = window.screenY
        if (this.expanded) {
          if (!move) {
            this.expanded = false
              // Changes the expanded size back to non-expanded....
            if (this.rightside === 'yes') {
              this.$electron.remote.getCurrentWindow().setPosition(xpos + 630, ypos)
              this.flexdirection = 'row'
            }
            this.$electron.remote.getCurrentWindow().setContentSize(120, 522)
            // check if off screen during non-expanded....
            if ((xpos + 120) > screen.width) {
              this.$electron.remote.getCurrentWindow().setPosition(screen.width - 120, ypos)
            }
            if ((xpos) < 0) {
              this.$electron.remote.getCurrentWindow().setPosition(0, ypos)
            }
          }
            // check if off screen during expanded....
          if ((xpos + 750) > screen.width && this.expanded) {
            this.$electron.remote.getCurrentWindow().setPosition(screen.width - 750, ypos)
          }
          if ((xpos) < 0) {
            this.$electron.remote.getCurrentWindow().setPosition(0, ypos)
          }
        } else { // if NOT expanded
          if (!move) {
            this.notifications = 0
            this.expanded = true
            this.$electron.remote.getCurrentWindow().setContentSize(750, 522)
            this.flexdirection = (window.screenX + (this.$electron.remote.getCurrentWindow().getContentSize()[0] / 2) < (screen.width / 2)) ? 'row' : 'row-reverse'
            if (this.rightside === 'no') {
              console.log('not moving, on left side....', this.rightside)
              if ((xpos) < 0) {
                this.$electron.remote.getCurrentWindow().setPosition(0, ypos)
              }
            } else {
              this.$electron.remote.getCurrentWindow().setPosition(xpos - 750, ypos)
            }
            if ((xpos + 750) > screen.width) {
              this.$electron.remote.getCurrentWindow().setPosition(screen.width - 750, ypos)
            }
          }
          if ((xpos + 120) > screen.width && this.expanded === false) {
            this.$electron.remote.getCurrentWindow().setPosition(screen.width - 120, ypos)
          }
          if ((xpos) < 0) {
            this.$electron.remote.getCurrentWindow().setPosition(0, ypos)
          }
        }
      },
      expand () {
        this.onmove()
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
