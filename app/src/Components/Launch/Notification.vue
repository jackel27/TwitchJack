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
  import { getNotifications, getChannel } from '../../vuex/getters'
  export default {
    vuex: {
      getters: {
        getNotifications,
        getChannel
      }
    },
    events: {
      'newmessage' () {
        this.notification()
      }
    },
    data () {
      return {
        notifications: this.getNotifications,
        channel: this.getChannel
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
