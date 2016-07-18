<style scoped>
  .chatwindow {
    height: 300px;
    width: 100%;
    flex: 1;
    display: flex;
    overflow-y: auto;
    margin-top: 39px;
  }

  input.input, .control {
    width: 100%!important;
  }

  .box {
    min-height: min-content;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: rgba(0, 0, 0, 0.8);;
  }

  .sendmessage {
    width: 100%;
    display: flex;
    /*justify-content: flex-end;*/
  }

  .msg-transition {
    opacity: 1;
    transition: opacity 1s ease;
  }
  .msg-enter {
    opacity: 0;
  }
  .msg-leave {
    opacity: 0;
    display: none;
    position: absolute;     /*important for removal move to work */
  }
  div.column.is-10 {
    padding-left: 10px!important;
    padding-right: 10px!important;
  }

  div.column.is-2 {
    width: 130px!important;
    padding-right: 0px;
  }

  .image-display {
    text-align: center;
    margin: 0 auto;
  }

  .username-display {
    text-align: center;
    overflow-wrap: break-word;
    padding-top: 10px;
    padding-bottom: 2px;
    background-color: rgba(107, 116, 127, 0.8);
    font-weight: bold;
    color: black;
    -webkit-app-region: drag;
    height: 50px;
  }

  .boxes {
    width: 120px;
    height: 120px;
    margin-top:2px;
  }

  .boxes.box0 {
    background-image: url("http://placehold.it/128x128");
    background-size: contain;
  }

  .box1 {
    background-color: rgba(107, 116, 127, 0.5);
    background-size: contain;
    background-image: url("http://i.imgur.com/lvowkhh.png");
    font-size: 2em;
    color: red;
    font-weight: bold;
    text-align: center;
    padding-top: 33%;
  }

  .box2 {
    background-color: rgba(68, 154, 255, 0.5);
    font-size: 30px;
    font-weight: bold;
    color: white;
    text-align: center;
    padding-top: 33%;
    background-position: center;
  }

  .box3 {
    background-color: rgba(214, 233, 255, 0.5);
    text-align: center;
    overflow-wrap: break-word;
    font-size: .9em;
    padding-top: 33%;
    /*background-image: url();*/
  }

  .twitchlink {
    color: white;
    font-weight: bold;
    font-size: 1em;
  }
</style>

<template>
 <div class="columns is-gapless is-mobile" v-bind:style="{ flexDirection: flexdirection }">
    <div class="column is-2">

      <div class="username-display" id="dragbox">
        {{ username }}
      </div>

      <div class="boxes box0" v-bind:style="{ backgroundImage: 'url(' + clientimg + ')' }">
      </div>

      <div class="boxes box1" @click="expand">
        {{ notifications }}
      </div>

      <div class="boxes box2">
        {{ viewers }}
      </div>

      <div class="boxes box3">
        <p class="twitchlink">Twitch.tv/{{ username }}</p>
      </div>

    </br>
    </div>
    <div class="column is-10">
      <div class="chatwindow" id="chatwin">
        <div class="box">
          <div class="msg" v-for="msg in messagegroup" transition="msg" track-by="$index">
            <span class="username" :style="{ color: msg.color }">{{ msg.username }}</span>: <span class="message"> {{{ msg.message }}} </span>
          </div>
        </div>
      </div>
      <div class="sendmessage">
        <p class="control has-addons">
          <input class="input" v-model="sendmessage" type="text" placeholder="Chat...">
          <a class="button is-info" @click="sendmymessage">
            Send
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import Tmi from 'tmi.js'
  // let username = require('../../credentials.json').username
  let { username, key } = require('../../credentials.json')
  // let key = require('../../credentials.json').key
  // import CurrentPage from './LandingPageView/CurrentPage'
  export default {
    components: {
      // CurrentPage,
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
        console.log(window.screenX)
        if (this.expanded) {
          this.flexdirection = (window.screenX + (this.$electron.remote.getCurrentWindow().getContentSize()[0] / 2) < (screen.width / 2)) ? 'row' : 'row-reverse'
        }
        this.rightside = (window.screenX + (this.$electron.remote.getCurrentWindow().getContentSize()[0] / 2) < (screen.width / 2)) ? 'false' : 'true'
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
            this.$electron.remote.getCurrentWindow().setContentSize(120, 522)
            if (this.rightside) {
              this.flexdirection = 'row'
              this.$electron.remote.getCurrentWindow().setPosition(xpos + 630, ypos)
            } else {
              this.$electron.remote.getCurrentWindow().setPosition(xpos - 630, ypos)
            }
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
            if (this.rightside) {
              this.flexdirection = 'row-reverse'
            } else { // left side handler....
              this.flexdirection = 'row'
              if ((xpos) < 0) {
                this.$electron.remote.getCurrentWindow().setPosition(0, ypos)
              }
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
