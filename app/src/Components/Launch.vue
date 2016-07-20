<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
</style>
<template>
  <chat-window></chat-window>
  <div>
    <button class="button is-danger" @click="goHome">Return to home</button>
  </div>
</template>
<script>
  // import MainPanel from './MainPanel'
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
        this.goHome()
      }
    },
    components: {
      // MainPanel,
      ChatWindow
    },
    data () {
      return {
      }
    },
    ready () {
      connect.connect()
      // .remote.getCurrentWindow().setMenuBarVisibility(true)
      this.$electron.remote.getCurrentWindow().frame = false
      this.$electron.remote.getCurrentWindow().maximize()
    },
    methods: {
      goHome () {
        this.$router.go({name: 'landing'})
      },
      connect () {
      }
    },
    name: 'launch'
  }
</script>
