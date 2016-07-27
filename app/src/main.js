import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import App from './App'
// import routes from './routes'
import 'bulma/css/bulma.css'
import VueAnimatedList from 'vue-animated-list'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(VueAnimatedList)
Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true
import config from '../../config'
const router = new Router({history: true, root: config.root})

// router.map(routes)
router.map({
  '/': {
    name: 'landing',
    component: (resolve) => {
      require(['./components/Landing'], resolve)
    }
  },
  '/connect': {
    name: 'launch',
    component: (resolve) => {
      require(['./components/Launch'], resolve)
    }
  },

  '/settings': {
    name: 'settings',
    component: (resolve) => {
      require(['./components/Settings'], resolve)
    }
  },

  '/connected-menu': {
    name: 'connected-menu',
    component: (resolve) => {
      require(['./components/ConnectedMenu'], resolve)
    }
  }
})
router.beforeEach(() => {
  window.scrollTo(0, 0)
})
router.redirect({
  '*': '/'
})

router.start(App, 'app')
// export default router
export const myrouter = router
