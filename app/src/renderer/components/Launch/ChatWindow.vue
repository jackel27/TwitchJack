<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  scrollbar {
    width: 15px;
    height: 15px;
  }
  scrollbar-button {
    width: 0px;
    height: 0px;
  }
  scrollbar-thumb {
    background: #e1e1e1;
    border: 0px none #ffffff;
    border-radius: 17px;
  }
  scrollbar-thumb:hover {
    background: #ffffff;
  }
  scrollbar-thumb:active {
    background: #000000;
  }
  scrollbar-track {
    background: #2b2928;
    border: 0px none #ffffff;
    border-radius: 42px;
  }
  scrollbar-track:hover {
    background: #666666;
  }
  scrollbar-track:active {
    background: #c1bfbf;
  }
  scrollbar-corner {
    background: transparent;
  }

  .chatwindow {
    height: 300px;
    width: 100%;
    flex: 1;
    display: flex;
    overflow-y: auto;
  }

  .box {
    min-height: min-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: rgba(0, 0, 0, 0.8);
    padding-bottom: 0!important;
  }

  .sendmessage {
    width: 100%;
    display: flex;
  }

  .msg-transition {
    z-index: 10;
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

  .chatinput {
    width: 100%!important;
    background-color: transparent;
    color: white;
  }
  .chatmessage {
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%!important;
  }
  #button {
    width: 100px!important;
    height: 15px!important;
  }
  .columns {
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    margin-bottom: 0px!important;
    background-color: #393E41;
  }

  .bgimage {
    position: fixed;
    margin-left: 25%!important;
    margin-top: 22px;
    filter: opacity(.2);
  }


</style>
<template>
  <div>
    <div class="columns is-mobile">

      <div class="column is-10" v-bind:style="{ display: showchat }">
        <div class="chatwindow" id="chatwin">
          <div class="bgimage">
            <img src="../Assets/twitchjacklogo.png" alt="" />
          </div>
          <div class="box">
            <div class="msg" v-for="msg in $store.state.chat.messages" transition="msg">
              <span class="username" :style="{ color: msg.color }">{{ msg.username }}</span>: <span class="message" v-html="msg.message"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-2" v-bind:style="{ display: showchat }">
        <viewer-list></viewer-list>
      </div>

    </div>
    <div class="chat" v-bind:style="{ display: showchat }">
      <p class="control has-addons chatmessage">
        <input class="input chatinput" tabindex="-1" type="text" id="clientmsg" @keyup.enter="sendmessage" v-model="message" placeholder="Message...">
      </p>
    </div>
  </div>
</template>
<script>
  import ViewerList from './ViewerList'
  /*eslint-disable */
  import connect from '../connect.js'
  /*eslint-enable */
  export default {
    components: {
      ViewerList
    },
    data () {
      return {
        systemnotifications: [],
        showchat: 'none',
        message: ''
      }
    },

    created () {
      this.$root.$on('togglechat', () => {
        this.togglechat()
      })

      this.$eventBus.$on('newmessage', () => {
        this.newMessage()
        // console.log(get)
        for (let x = 0; x < this.systemnotifications.length; x++) {
          this.systemnotifications[x].close()
        }
        // this.systemnotifications = []
        if (this.$store.state.chat.notifications > 0 && this.$store.state.chat.notifications <= 10) {
          let myNotification = new Notification(this.$store.state.chat.notifications + ' Unread Messages!', {
            body: ' ',
            renotify: true,
            silent: true,
            tag: 'NewMessage'
          })
          this.systemnotifications.push(myNotification)
        }
      })
      /* eslint-disable */
      this.$electron.ipcRenderer.on('home', (event, arg) => {
        connect.disconnect()
        this.$router.app.$broadcast('loginfail')
      })
      /* eslint-enable */
      this.chatmin()
    },
    methods: {
      chatmin () {
        this.$store.dispatch('setChatState', false)
        this.showchat = 'none'
        // resize when minimized...
        this.$electron.remote.getCurrentWindow().setContentSize(0, 0)
        this.$electron.remote.getCurrentWindow().setPosition(1, 0)
        this.$electron.remote.getCurrentWindow().minimize()
      },
      chatmax () {
        this.$electron.remote.getCurrentWindow().restore()
        this.$store.dispatch('clearNotifications')
        let width = screen.width
        this.$store.dispatch('setChatState', true)
        this.$store.dispatch('clearNotifications')
        this.showchat = 'flex'
        // change size and position of window when showing chat
        this.$electron.remote.getCurrentWindow().setContentSize(width, 378)
        this.$electron.remote.getCurrentWindow().setPosition(0, 0)
        // set focus to chat line...
        this.$electron.remote.getCurrentWindow().focus()
        window.setTimeout(() => {
          document.getElementById('clientmsg').focus()
        }, 400)
      },
      togglechat () {
        // close it if opened
        if (this.showchat === 'flex') {
          this.chatmin()
        } else {
          this.newMessage()
          this.chatmax()
        }
      },
      sendmessage () {
        connect.message(this.message)
        document.getElementById('clientmsg').value = ''
      },
      newMessage () {
        let objDiv = document.getElementById('chatwin')
        let isScrolledToBottom = objDiv.scrollHeight - objDiv.clientHeight <= objDiv.scrollTop + 60
        if (isScrolledToBottom) {
          setTimeout(() => {
            objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight
          }, 10)
        }
      }
    },
    name: 'chat-window'
  }
</script>
