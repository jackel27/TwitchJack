<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  .notification {
    position: absolute;
    background-color: rgba(0,0,0,.3);
    font-size: 2em;
    color: red;
    margin: 10px;
    z-index: -1;
  }
</style>
<template>
  <div class="notification">
    {{ notifications }}
  </div>
</template>
<script>
  // import MainPanel from './MainPanel'
  // import Twitch from './twitch.js'
  import { getNotifications } from '../../vuex/getters'
  export default {
    vuex: {
      getters: {
        getNotifications
      },
      actions: {
      }
    },
    events: {
      'newmessage' () {
        this.notification()
      }
    },
    components: {
    },
    data () {
      return {
        notifications: this.getNotifications
      }
    },
    ready () {
    },
    methods: {
      notification () {
        this.notifications = this.getNotifications
      }
    },
    name: 'notification'
  }
</script>
