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
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store'
  export default {
    store,
    created () {
      const globalShortcut = this.$electron.remote.globalShortcut
      globalShortcut.unregisterAll()

      globalShortcut.register('Shift+C', () => {
        console.log('Key Pressed! togglechat')
        this.$root.$emit('togglechat')
      })
      // Restart Application....
      globalShortcut.register('CommandOrControl+Shift+R', () => {
        this.$electron.remote.app.relaunch()
        this.$electron.remote.app.quit()
      })
      // close connection, return to home..
      globalShortcut.register('CommandOrControl+Shift+D', () => {
        // mainWindow.webContents.send('home', 'Restarting application')
      })
      // quit Application....
      globalShortcut.register('CommandOrControl+Shift+Q', () => {
        this.$electron.remote.app.quit()
      })
    }
  }
</script>
