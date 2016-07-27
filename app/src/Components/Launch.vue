<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  body {
    font-family: Lato, Helvetica, sans-serif;
    // -webkit-app-region: drag;
    background-color: transparent;
  }

</style>
<template>
  <chat-window></chat-window>
</template>
<script>
  import { getUsername, getUserpass, getChannel } from '../vuex/getters'
  import connect from './connect.js'
  import ChatWindow from './Launch/ChatWindow'
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
      ChatWindow
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
      this.$electron.remote.getCurrentWindow().frame = false
      this.$electron.remote.getCurrentWindow().setContentSize(100, 31)
    },
    methods: {
    },
    name: 'launch'
  }
</script>
