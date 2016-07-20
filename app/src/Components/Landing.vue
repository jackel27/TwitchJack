<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  .control {
    width: 50%;
    margin: 0 auto;
  }
  .logo-image {
    width: 400px;
    height: auto;
  }

  .logo-container, .content {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>
<template>
  <div>
    <div class="logo-container">
      <img class="logo-image" src="http://vignette4.wikia.nocookie.net/logopedia/images/2/26/Twitch_logo.svg/revision/latest?cb=20140727180649" target="_blank">
    </div>
    <p class="control has-icon">
      <input class="input" type="username" v-model='profile.username' placeholder="Twitch Username">
      <i class="fa fa-user"></i>
    </p>
    <p class="control has-icon">
      <input class="input" type="password" v-model='profile.password' placeholder="OAuth Key">
      <i class="fa fa-lock"></i>
    </p>
    <p class="control has-icon">
      <input class="input" type="text" v-model='profile.channel' placeholder="Channel ID eg: 'freecodecamp' ">
      <i class="fa fa-hashtag"></i>
    </p>
    <p class="control">
      <button class="button is-info is-pulled-right" @click='login'>
        Login
      </button>
      <button class="button is-light is-pulled-right" @click='settings'>
        <i class="fa fa-gear fa-2x"></i>
      </button>
    </p>
    <div class="content">
      <blockquote>Don't have an OAuth? pick one up <a>here</a> </blockquote>
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
  export default {
    vuex: {
      // getters: {
      //   getusername: getUsername,
      //   getuserpass: getUserpass,
      //   getchannel: getChannel
      // },
      actions: {
        setUsername,
        setUserpass,
        setChannel
      }
    },
    components: {
      // MainPanel,
    },
    data () {
      return {
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
    },
    methods: {
      settings () {
        this.$router.go({ name: 'settings' })
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
