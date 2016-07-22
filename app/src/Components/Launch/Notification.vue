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
  import { getNotifications } from '../../vuex/getters'
  export default {
    vuex: {
      getters: {
        getNotifications
      }
    },
    events: {
      'newmessage' () {
        this.notification()
      }
    },
    data () {
      return {
        notifications: this.getNotifications
      }
    },
    methods: {
      notification () {
        this.notifications = this.getNotifications
      }
    },
    name: 'notification'
  }
</script>
