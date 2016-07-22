<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  ul {
    list-style-position: inside;
  }
  .viewers {
    height: 400px;
    margin-top: 20px;
    /*width: 220px;*/
    text-align: center;
    overflow-y: scroll;
    margin-right: 10px;
    background-color: white;
    width: 150px;
  }

  .expand {
    height: 400px;
    align-items: center;
    display: flex;
  }
</style>
<template>
  <div class=" is-pulled-right">
    <div class="columns is-mobile">
      <div class="expand column is-4">
        <button class="button is-primary" @click="viewerexpand">Viewers</button>
      </div>
      <div class="viewers column" v-bind:style="{ display: showviewers }">
        <ul>
          <li v-for="viewer in viewers" v-filter="">
            {{ viewer }}
          </li>
        </ul>
      </div>
    </div>
  </div>


</template>
<script>
  // import MainPanel from './MainPanel'
  // import Twitch from './twitch.js'
  import connect from '../connect.js'
  export default {
    vuex: {
      getters: {
      },
      actions: {
      }
    },
    events: {
    },
    components: {
      // MainPanel,
    },
    data () {
      return {
        showviewers: 'none',
        viewers: {message: 'No Users Present'}
      }
    },
    ready () {
      this.getusers()
      setInterval(this.getusers, 10000)
    },
    methods: {
      getusers () {
        this.viewers = connect.viewers()
      },
      viewerexpand () {
        if (this.showviewers === 'block') {
          this.showviewers = 'none'
        } else {
          this.showviewers = 'block'
        }
      }
    },
    name: 'viewer-list'
  }
</script>
