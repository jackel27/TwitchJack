<style scoped>

div.column.is-2 {
  width: 130px!important;
  padding-right: 0px;
}

.image-display {
  text-align: center;
  margin: 0 auto;
}

.username-display {
  text-align: center;
  overflow-wrap: break-word;
  padding-top: 10px;
  padding-bottom: 2px;
  background-color: rgba(107, 116, 127, 0.8);
  font-weight: bold;
  color: black;
  -webkit-app-region: drag;
  height: 50px;
}

.boxes {
  width: 120px;
  height: 120px;
  margin-top:2px;
}

.boxes.box0 {
  background-image: url("http://placehold.it/128x128");
  background-size: contain;
}

.box1 {
  background-color: rgba(107, 116, 127, 0.5);
  background-size: contain;
  background-image: url("http://i.imgur.com/lvowkhh.png");
  font-size: 2em;
  color: red;
  font-weight: bold;
  text-align: center;
  padding-top: 33%;
}

.box2 {
  background-color: rgba(68, 154, 255, 0.5);
  font-size: 30px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding-top: 33%;
  background-position: center;
}

.box3 {
  background-color: rgba(214, 233, 255, 0.5);
  text-align: center;
  overflow-wrap: break-word;
  font-size: .9em;
  padding-top: 33%;
  /*background-image: url();*/
}

.twitchlink {
  color: white;
  font-weight: bold;
  font-size: 1em;
}
</style>
<template>
  <div class="column is-2">

    <div class="username-display" id="dragbox">
      {{ $parent.username }}
    </div>

    <div class="boxes box0" v-bind:style="{ backgroundImage: 'url(' + $parent.clientimg + ')' }">
    </div>

    <div class="boxes box1" @click="$parent.expand">
      {{ $parent.notifications }}
    </div>

    <div class="boxes box2">
      {{ $parent.viewers }}
    </div>

    <div class="boxes box3">
      <p class="twitchlink">Twitch.tv/{{ $parent.username }}</p>
    </div>

  </br>
  </div>
</template>
