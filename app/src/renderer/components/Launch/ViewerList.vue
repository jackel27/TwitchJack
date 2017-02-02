<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  ul {
    list-style-position: inside;
  }
  .viewers {
    height: 243px;
    margin-top: 20px;
    padding-top: 10px;
    text-align: center;
    overflow-y: scroll;
    margin-right: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    width: 150px;
  }

  .expand {
    height: auto;
    align-items: center;
    display: flex;
  }

  .column {
    width: 100%;
    margin: 0 auto!important;
  }

  .channelname {
    color: coral;
    font-size: 1.4em;
  }

  .viewerlength {
    color: darkorange;
  }

  .rightcol {
    padding-bottom: 0!important;
  }

</style>
<template>

  <div class="column rightcol">
    <div class="has-text-centered channelname">
      #{{ channel.toUpperCase() }}
    </div>

    <div class="has-text-centered viewerlength">
      Viewers: {{ viewers.length }}
    </div>
    <div class="viewers column">
      <ul>
        <li v-for="viewer in viewers">
          {{ viewer }}
        </li>
      </ul>
    </div>
  </div>

</template>
<script>
  import connect from '../connect.js'
  export default {
    events: {
    },
    components: {
    },
    data () {
      return {
        showviewers: 'none',
        viewers: {message: 'No Users Present'},
        channel: this.$store.state.profile.channel || ''
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
