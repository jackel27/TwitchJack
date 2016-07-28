<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

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
</style>
<template>
  <div class="columns is-mobile">


  <div class="column is-10" v-bind:style="{ display: showchat }">
    <div class="chatwindow" id="chatwin">
      <div class="box">
        <div class="msg" v-for="msg in getChat" transition="msg">
          <span class="username" :style="{ color: msg.color }">{{ msg.username }}</span>: <span class="message"> {{{ msg.message }}} </span>
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
</template>
<script>
  import ViewerList from './ViewerList'
  /*eslint-disable */
  import connect from '../connect.js'
  import { clearNotifications, setChatState } from '../../vuex/actions'
  import { getChat, getNotifications } from '../../vuex/getters'
    /*eslint-enable */
  export default {
    vuex: {
      getters: {
        getChat,
        getNotifications
      },
      actions: {
        clearNotifications,
        setChatState
      }
    },
    events: {
      'newmessage' () {
        this.newMessage()
        // console.log(get)
        for (let x = 0; x < this.systemnotifications.length; x++) {
          this.systemnotifications[x].close()
        }
        // this.systemnotifications = []
        if (this.getNotifications > 0 && this.getNotifications <= 10) {
          let myNotification = new Notification(this.getNotifications + ' Unread Messages!', {
            body: ' ',
            renotify: true,
            silent: true,
            tag: 'NewMessage'
          })
          this.systemnotifications.push(myNotification)
        }
      }
    },
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
    ready () {
      /* eslint-disable */
      this.$electron.ipcRenderer.on('chat', (event, arg) => {
        this.togglechat()
      })
      this.$electron.ipcRenderer.on('home', (event, arg) => {
        connect.disconnect()
        this.$router.app.$broadcast('loginfail')
      })
      /* eslint-enable */
      this.chatmin()
    },
    methods: {
      chatmin () {
        this.setChatState(false)
        this.showchat = 'none'
        // resize when minimized...
        this.$electron.remote.getCurrentWindow().setContentSize(100, 10)
        this.$electron.remote.getCurrentWindow().setPosition(1, 0)
      },
      chatmax () {
        this.clearNotifications()
        let width = screen.width
        this.setChatState(true)
        this.clearNotifications()
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
