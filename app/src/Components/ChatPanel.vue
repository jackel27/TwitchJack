<style scoped>

.chatwindow {
  height: 300px;
  width: 100%;
  flex: 1;
  display: flex;
  overflow-y: auto;
  margin-top: 39px;
}

input.input, .control {
  width: 100%!important;
}

.box {
  min-height: min-content;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.8);;
}

.sendmessage {
  width: 100%;
  display: flex;
  /*justify-content: flex-end;*/
}

.msg-transition {
  opacity: 1;
  transition: opacity 1s ease;
}
.msg-enter {
  opacity: 0;
}
.msg-leave {
  opacity: 0;
  display: none;
  position: absolute;     /*important for removal move to work */
}
div.column.is-10 {
  padding-left: 10px!important;
  padding-right: 10px!important;
}

</style>

<template>
  <div class="column is-10">
    <div class="chatwindow" id="chatwin">
      <div class="box">
        <div class="msg" v-for="msg in $parent.messagegroup" transition="msg" track-by="$index">
          <span class="username" :style="{ color: msg.color }">{{ msg.username }}</span>: <span class="message"> {{{ msg.message }}} </span>
        </div>
      </div>
    </div>
    <div class="sendmessage">
      <p class="control has-addons">
        <input class="input" v-model="$parent.sendmessage" type="text" placeholder="Chat...">
        <a class="button is-info" @click="$parent.sendmymessage">
          Send
        </a>
      </p>
    </div>
  </div>
</template>
