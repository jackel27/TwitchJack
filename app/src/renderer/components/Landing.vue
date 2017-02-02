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
    /*padding-top: 30px;*/
    /*124 88 191
      #7c58bf
      61458e

      97, 69, 142
    */
    height: 100vh;
    background-color: rgba(97, 69, 142,.95);
  }
  .logo-container {
    -webkit-app-region: drag;
    cursor: move;
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

  #sig {
    display: flex;
    color: whitesmoke;
    /*padding-top: 20px;*/
    align-items: baseline;
    justify-content: center;
    position: fixed;
    margin: 0 auto;
    left: 78%;
    /*bottom: 47.5%;*/
  }

  #oauthblock {
    background-color: #433261;
/* border-left: 5px solid #d3d6db; */
/*padding: 1.5em;*/
  height: 54px;
/*margin-top: 35px;*/
  }


  .loginbtn {
    background-color: #5AB1BB;
    width: 219px;
    height: 45px;
    font-weight: 600;
  }
  .loginbtn:hover {
    background-color: #4bc8d6;
  }
  .button.is-light {
        height: 45px;
    background-color: #484A47;
  }
  .button.is-light:hover {
    background-color: #30332f;
  }
  .rememberme {
    color: white;
    padding-top: 2px;
  }

  .block-quote {
    border: none;
  }

  .authcont {
    text-align: center;
    margin-top: 0px;
    -webkit-user-select: text;
    padding-bottom: 0px;
    color: cadetblue;
  }

  input {
    font-size: x-large;
    text-align: center;
  }
</style>
<template>
  <div>
    <span class="exit-container icon is-medium">
      <i class="fa fa-remove" @click="exit"></i>
    </span>



    <div class="logo-container">
      <img class="logo-image" src="./Assets/logo_twitch_jack.png" target="_blank">
      <blockquote id="sig">
        by: David Kaiser (JackeL27)

      </blockquote>
    </div>
    <div class="innerbody">
      <div class="content authcont">
        <blockquote id="oauthblock">Don't have an OAuth? pick one up at www.twitchapps.com/tmi/
        </blockquote>

      </div>
      <p class="control has-icon">
        <input class="input is-large" type="username" v-model='profile.username' placeholder="Your Twitch Username">
        <i class="fa fa-user fa-4x"></i>
      </p>
      <p class="control has-icon">
        <input class="input is-large" type="password" v-model='profile.password' placeholder="OAuth Key">
        <i class="fa fa-lock fa-4x"></i>
      </p>

      <p class="control has-icon">
        <input class="input is-large" type="text" v-model='profile.channel' placeholder="Channel ID eg: 'jackel_27' ">
        <i class="fa fa-hashtag fa-4x"></i>
      </p>

      <p class="control">
        <label class="checkbox rememberme is-pulled-right">
          <input type="checkbox" id="checkbox" v-model="checked">
          Remember Me
        </label>
      </p>
      <br>

      <p class="control">
        <button class="button loginbtn is-pulled-right" @click='login'>
          Login
        </button>
        <router-link to="/settings">
          <button class="button is-light is-pulled-right">
            <i class="fa fa-gear fa-2x"></i>
          </button>
        </router-link>
      </p>

      <p class="control has-icon">
      </p>
    </div>
  </div>
</template>
<script>
  // import MainPanel from './MainPanel'
  // import Twitch from './twitch.js'
  // import { getUsername, getUserpass, getChannel } from '../vuex/getters'
  // const path = require('path')
  export default {
    // events: {
    //   'connected' () {
    //     this.isConnected()
    //   }
    // },
    components: {
      // MainPanel,
    },
    data () {
      return {
        checked: null,
        mainlogo: './Assets/twitchjacklogo.png',
        profile: {
          username: '',
          password: '',
          channel: ''
        },
        validform: false
      }
    },
    created () {
      if (JSON.parse(localStorage.getItem('rememberme')) === true) {
        this.profile = JSON.parse(localStorage.getItem('profile'))
        this.checked = true
      }
      this.$electron.remote.getCurrentWindow().unmaximize()
      this.$electron.remote.getCurrentWindow().setContentSize(530, 550)
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
          if (this.checked) {
            localStorage.setItem('rememberme', this.checked)
            localStorage.setItem('profile', JSON.stringify(this.profile))
          } else {
            localStorage.setItem('rememberme', false)
            localStorage.setItem('profile', null)
          }
          this.$store.dispatch('setUsername', this.profile.username)
          this.$store.dispatch('setUserpass', this.profile.password)
          this.$store.dispatch('setChannel', this.profile.channel)
          this.$router.push({ path: '/connect' })
        }
      }
    },
    name: 'landing'
  }
</script>
