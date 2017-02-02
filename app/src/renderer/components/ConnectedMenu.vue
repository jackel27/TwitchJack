<style scoped>
html, body { height: 100%; }
.buttons {
  height: 100vh;
  align-items: center;
  background:
  radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 1) 0%,
    rgba(229, 229, 229, .85) 100%
    );
    background-position: center;
    display: flex;
    font-family: Lato, Helvetica, sans-serif;
    justify-content: center;
    text-align: center;
  }
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

</style>
<template>
  <div class="buttons">

    <p class="control">
      <button class="button is-info" v-link='{name: "launch"}'>
        Resume
      </button>
      <button class="button is-danger" @click='disconnect'>
        <i class="fa fa-cancel fa-2x"></i>
        Disconnect
      </button>

      <button class="button is-light" v-link='{name: "settings"}'>
        <i class="fa fa-gear fa-2x"></i>
      </button>

    </p>

    <p class="control has-icon">

    </p>
  </div>
</template>

<script>
  import connect from './connect.js'
  export default {
    vuex: {
      actions: {
      }
    },
    events: {
      'connected' () {
        this.Connected = true
      },
      'loginfail' () {
        this.$router.go({name: 'landing'})
      }
    },
    components: {
      // MainPanel,
    },
    data () {
      return {
        Connected: null
      }
    },
    ready () {
      this.$electron.remote.getCurrentWindow().unmaximize()
    },
    methods: {
      disconnect () {
        connect.disconnect()
      }
    },
    name: 'connected-menu'
  }
</script>
