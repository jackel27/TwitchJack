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
  export default {
    data () {
      return {
        notifications: this.$store.state.chat.notifications,
        channel: this.$store.state.profile.channel
      }
    },
    name: 'notification'
  }
</script>
