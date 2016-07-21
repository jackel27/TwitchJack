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
  div.column.is-12 {
    padding-left: 10px!important;
    padding-right: 10px!important;
    padding-bottom: 0px!important;
  }

  .expandbtn {
    text-align: center;
  }

  .chatinput {
    width: 100%!important;
    background-color: transparent;
    color: white;
  }
  .chatmessage {
    margin-left: 10px;
    margin-right: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%!important;
  }
</style>
<template>

<div class="column is-12" v-bind:style="{ display: showchat }">
  <div class="chatwindow" id="chatwin">
    <div class="box">
      <div class="msg" v-for="msg in getChat" transition="msg">
        <span class="username" :style="{ color: msg.color }">{{ msg.username }}</span>: <span class="message"> {{{ msg.message }}} </span>
      </div>
    </div>
  </div>
</div>
<div class="chat" v-bind:style="{ display: showchat }">
  <p class="control has-addons chatmessage">
    <input class="input chatinput" type="text" id="clientmsg" @keyup.enter="sendmessage" v-model="message" placeholder="Message...">
  </p>
</div>
  <div class="expandbtn">
    <button class="button is-info" id="button" @click="togglechat">Expand</button>
  </div>

</template>
<script>
  // import MainPanel from './MainPanel'
  // import Twitch from './twitch.js'
  /*eslint-disable */
  import connect from '../connect.js'
  import { clearNotifications, setChatState } from '../../vuex/actions'
  import { getChat } from '../../vuex/getters'
    /*eslint-enable */
  export default {
    vuex: {
      getters: {
        getChat
      },
      actions: {
        clearNotifications,
        setChatState
      }
    },
    events: {
      'newmessage' () {
        this.newMessage()
      }
    },
    components: {
      // MainPanel,
    },
    data () {
      return {
        showchat: 'none',
        message: ''
      }
    },
    ready () {
    },
    methods: {
      togglechat () {
        console.log(this.showchat)
        if (this.showchat === 'flex!important') {
          this.setChatState(false)
          this.showchat = 'none!important'
        } else {
          this.setChatState(true)
          this.clearNotifications()
          this.showchat = 'flex!important'
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
