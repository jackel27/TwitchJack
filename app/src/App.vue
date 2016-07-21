<style>
html {
  background-color: transparent!important;
  background: rgba(0, 0, 0, 0)!important;
  overflow: hidden!important;
}

  html,
  body { height: 100%; }


  .message {
    font-size: 1.2em;
    color: ghostwhite;
  }

  .username {
    font-weight: bolder;
    font-size: 1.3em;
    color: #E88873;
  }
  .message {
    background-color: rgba(0, 0, 0, 0)!important;
    color: ghostwhite;
  }



</style>
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'src/vuex/store'
  export default {
    store
  }
</script>
