<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  body {
    font-family: Lato, Helvetica, sans-serif;
    // -webkit-app-region: drag;
    background-color: transparent;
  }

</style>
<template>
  <notification></notification>
  <chat-window></chat-window>
  <viewer-list></viewer-list>
  <div>
    <button class="button is-danger" v-link="{name: 'connected-menu'}">Menu</button>
  </div>
</template>
<script>
  import { getUsername, getUserpass, getChannel } from '../vuex/getters'
  import connect from './connect.js'
  import ChatWindow from './Launch/ChatWindow'
  import ViewerList from './Launch/ViewerList'
  import Notification from './Launch/Notification'
  export default {
    vuex: {
      getters: {
        getUsername,
        getUserpass,
        getChannel
      }
    },
    events: {
      'loginfail' () {
        this.$router.go({name: 'landing'})
        this.isConnected = true
      },
      'connected' () {
        this.isConnected = true
      }
    },
    components: {
      ChatWindow,
      ViewerList,
      Notification
    },
    data () {
      return {
        isConnected: false
      }
    },
    ready () {
      if (!this.isConnected) {
        connect.connect()
      }
      // .remote.getCurrentWindow().setMenuBarVisibility(true)
      this.$electron.remote.getCurrentWindow().frame = false
      this.$electron.remote.getCurrentWindow().maximize()
    },
    methods: {
    },
    name: 'launch'
  }
</script>
