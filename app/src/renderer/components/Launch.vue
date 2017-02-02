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
  import connect from './connect.js'
  import ChatWindow from './Launch/ChatWindow'
  export default {
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
    created () {
      if (!this.isConnected) {
        connect.connect()
      }
      this.$electron.remote.getCurrentWindow().frame = false
      this.$electron.remote.getCurrentWindow().setContentSize(100, 31)
      /* eslint-disable */
      let myNotification = new Notification('Connected!', {
        body: 'Use CommandOrControl+LSHIFT+C to toggle chat',
        renotify: true,
        silent: true,
        tag: 'NewMessage'
      })
      /* eslint-enable */
    },
    methods: {
    },
    name: 'launch'
  }
</script>
