import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import App from './App'
import routes from './routes'
import 'bulma/css/bulma.css'
import VueAnimatedList from 'vue-animated-list'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(VueAnimatedList)
Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true

const router = new Router()

router.map(routes)
router.beforeEach(() => {
  window.scrollTo(0, 0)
})
router.redirect({
  '*': '/'
})

router.start(App, 'app')
// module.exports['router'] = router
export const myrouter = router
