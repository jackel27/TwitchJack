<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  .foot {
    text-align: center;
    margin: 0 auto;
  }
  .checkbox {
    display: flex;
    align-items: center;
  }
  .control {
    display: flex;
  }
  #chatkey {
    width: 70px;
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
            <label class="checkbox">
              <input type="checkbox" v-model="tc.control.enabled">
              Control/Cmd
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="tc.shift.enabled">
              Shift
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="tc.alt.enabled">
              Alt
            </label>
            <input class="input" v-model="tc.char.key" v-on:keydown="keycapture" id="chatkey" type="text" placeholder="A-z / 0-9">
          </p>

          {{ tc.char.key }}

          <label class="label">Disconnect and Return to Home</label>
          <p class="control">
            <input class="input" type="text" v-model="disco" placeholder="Default: CTRL or CMD + LSHIFT + D">
          </p>

          <label class="label">Restart</label>
          <p class="control">
            <input class="input" type="text" v-model="restart" placeholder="Default: CTRL or CMD + LSHIFT + R">
          </p>

          <label class="label">Quit</label>
          <p class="control">
            <input class="input" type="text" v-model="quit" placeholder="Default: CTRL or CMD + LSHIFT + Q">
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
        stringa: '',
        tc: {
          shortcut: '',
          control: {
            enabled: false,
            key: 'CommandOrControl'
          },
          shift: {
            enabled: false,
            key: 'Shift'
          },
          alt: {
            enabled: false,
            key: 'Alt'
          },
          char: {
            enabled: true,
            key: ''
          }
        },
        temp: [],
        chathotkeyinput: '',
        chathotkey: '',
        disco: '',
        quit: '',
        restart: ''
      }
    },
    ready () {
      console.log(this.getOptions)
    },
    methods: {
      keycapture (e) {
        this.tc.char.key = this.tc.char.key.slice(0, 0)
      },
      capturedone () {
      },
      save () {
        // CommandOrControl+Shift+C
        if (this.tc.char.key) {
          let tempstr = ''
          for (let x in this.tc) {
            if (this.tc[x].enabled) {
              if (x !== 'char') {
                tempstr = tempstr.concat(this.tc[x].key, '+')
              } else {
                tempstr = tempstr.concat(this.tc[x].key)
              }
              console.log(tempstr)
              this.tc.shortcut = tempstr
            }
          }
        } else {
          console.log('Cannot have an empty Character!')
        }
        console.log('SAVED!')
      }
    },
    name: 'settings'
  }
</script>
