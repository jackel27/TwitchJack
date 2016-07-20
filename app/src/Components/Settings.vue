<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
.foot {
  text-align: center;
  margin: 0 auto;
}
</style>
<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="heading">
          <h1 class="title">Hotkeys</h1>
          <h2 class="subtitle">
            set up your hotkeys
          </h2>
          <label class="label">Toggle Chat</label>
          <p class="control">
            <input class="input" type="text" placeholder="Default: CTRL + LSHIFT + C">
          </p>

          <label class="label">Toggle Viewer List</label>
          <p class="control">
            <input class="input" type="text" placeholder="Default: CTRL + LSHIFT + V">
          </p>

          <label class="label">Go to Home</label>
          <p class="control">
            <input class="input" type="text" placeholder="Default: CTRL + LSHIFT + H">
          </p>

          <label class="label">Disconnect</label>
          <p class="control">
            <input class="input" type="text" placeholder="Default: CTRL + LSHIFT + D">
          </p>
            <button class="button is-info is-pulled-right" @click='save'>Save</button>
        </div>
      </div>
    </section>
    <div class="foot">
      <button class="button is-danger" v-link="{ name: 'landing' }">Home</button>
    </div>
  </div>
</template>
<script>
  // import MainPanel from './MainPanel'
  // import Twitch from './twitch.js'
  import { getOptions } from '../vuex/getters'
  import { setOptions } from '../vuex/actions'
  export default {
    vuex: {
      getters: {
        getOptions
      },
      actions: {
        setOptions
      }
    },
    components: {
      // MainPanel,
    },
    data () {
      return {
      }
    },
    ready () {
      console.log(this.getOptions)
    },
    methods: {
      save () {
        console.log('SAVED!')
      }
    },
    name: 'settings'
  }
</script>
