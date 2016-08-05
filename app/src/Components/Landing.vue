<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  body {
    background-color: rgba(255,255,255,.2)!important;
  }
  .control {
    width: 50%;
    margin: 0 auto;
  }
  .logo-image {
    width: 400px;
    height: auto;
    -webkit-user-select: none;
  }

  .logo-container, .content {
    text-align: center;
    margin-top: 32px;
    -webkit-user-select: none;
    padding-bottom: 50px;
  }
  .innerbody {
    padding-top: 30px;
    background-color: white;
  }
  .logo-container {
    -webkit-app-region: drag;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .exit-container {
    display: flex;
    position: absolute;
    width: 100%!important;
    top: 0!important;
    padding: 0!important;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .fa-remove {
    display: flex;
    position: absolute;
    right: 0!important;
    padding: 0!important;
    margin: 0!important;
    top: -5px;
    z-index: 9999;
    cursor: pointer;
    color: rgba(160, 143, 243, 0.2 );

  }

</style>
<template>

  <span class="exit-container icon is-medium">
    <i class="fa fa-remove" @click="exit"></i>
  </span>



  <div class="logo-container">
    <img class="logo-image" src="Assets/logo_twitch_jack.png" target="_blank">
  </div>
  <div class="innerbody">
    <p class="control has-icon">
      <input class="input" type="username" v-model='profile.username' placeholder="Your Twitch Username">
      <i class="fa fa-user"></i>
    </p>
    <p class="control has-icon">
      <input class="input" type="password" v-model='profile.password' placeholder="OAuth Key">
      <i class="fa fa-lock"></i>
    </p>
    <p class="control has-icon">
      <input class="input" type="text" v-model='profile.channel' placeholder="Channel ID eg: 'jackel_27' ">
      <i class="fa fa-hashtag"></i>
    </p>
    <p class="control">
      <button class="button is-info is-pulled-right" @click='login'>
        Login
      </button>
      <button class="button is-light is-pulled-right" v-link="{name: 'settings'}">
        <i class="fa fa-gear fa-2x"></i>
      </button>
    </p>
    <div class="content">
      <blockquote>Don't have an OAuth? pick one up at www.twitchapps.com/tmi/
 </blockquote>
    </div>
    <p class="control has-icon">
    </p>
  </div>
</template>
<script>
  // import MainPanel from './MainPanel'
  // import Twitch from './twitch.js'
  // import { getUsername, getUserpass, getChannel } from '../vuex/getters'
  import { setUsername, setUserpass, setChannel } from '../vuex/actions'
  // const path = require('path')
  export default {
    vuex: {
      actions: {
        setUsername,
        setUserpass,
        setChannel
      }
    },
    events: {
      'connected' () {
        this.isConnected()
      }
    },
    components: {
      // MainPanel,
    },
    data () {
      return {
        mainlogo: './Assets/twitchjacklogo.png',
        profile: {
          username: '',
          password: '',
          channel: ''
        },
        validform: false
      }
    },
    ready () {
      this.$electron.remote.getCurrentWindow().unmaximize()
      this.$electron.remote.getCurrentWindow().setContentSize(530, 475)
      let xpos = (screen.width / 2 - 265)
      let ypos = (screen.height / 2 - 300)
      this.$electron.remote.getCurrentWindow().setPosition(xpos, ypos)
    },
    methods: {
      exit () {
        this.$electron.remote.app.quit()
      },
      isConnected () {
      },
      login () {
        this.validform = true
        for (let x in this.profile) {
          if (this.profile[x].length < 3) {
            window.alert(x + ' is not valid, please correct it')
            this.validform = false
          }
        }
        if (this.validform) {
          this.setUsername(this.profile.username)
          this.setUserpass(this.profile.password)
          this.setChannel(this.profile.channel)
          this.$router.go({ name: 'launch' })
        }
      }
    },
    name: 'landing'
  }
</script>
