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
            <input class="input" type="text" disabled placeholder="Default: CTRL or CMD + LSHIFT + C">
          </p>

          <label class="label">Disconnect and Return to Home</label>
          <p class="control">
            <input class="input" type="text" disabled placeholder="Default: CTRL or CMD + LSHIFT + D">
          </p>

          <label class="label">Restart Application</label>
          <p class="control">
            <input class="input" type="text" disabled placeholder="Default: CTRL or CMD + LSHIFT + R">
          </p>
            <button class="button is-info is-pulled-right" disabled @click='save'>Save</button>
        </div>
      </div>
    </section>
    <div class="foot">
      <button class="button is-danger" v-link="{ name: 'landing' }">Home</button>
    </div>
  </div>
</template>
<script>
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
