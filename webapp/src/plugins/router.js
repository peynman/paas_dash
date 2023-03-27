import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../../../src/routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes, // short for `routes: routes`
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0,
    }
  },
})

export default router
