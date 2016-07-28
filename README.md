# TwitchJack

> A simple 'alwaysOnTop' Twitch chat overlay useful for streaming. Built for those 'one' monitor folks ;)

## Getting Started


You need your Twitch OAuth Token. Grab it from here:
<a>www.twitchapps.com/tmi/</a>
``` bash
# clone the repo
git clone https://github.com/jackel27/TwitchJack.git

# navigate to root
cd twitchjack

# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build (For Linux, OSX, WIN)
npm run build:win32 (For Windows..)

```

## HotKeys

Custom Hotkey Configuration Coming soon... These are the current defaults:

``` bash
# Toggle Chat
CTRLorCMD + LSHIFT + C

# Disconnect
CTRLorCMD + LSHIFT + D

# Restart Application (In case of any bugs you may encounter...)
CTRLorCMD + LSHIFT + R

# Quit Application
CTRLorCMD + LSHIFT + Q
```

---

This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
