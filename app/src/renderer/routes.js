export default [
  {
    path: '/',
    component: require('components/Landing'),
    name: 'landing'
  },
  {
    path: '/connect',
    component: require('components/Launch'),
    name: 'launch'
  },
  {
    path: '/settings',
    component: require('components/Settings'),
    name: 'settings'
  },
  {
    path: '/connected-menu',
    component: require('components/ConnectedMenu'),
    name: 'connected-menu'
  },
  {
    path: '*',
    redirect: '/'
  }
]
