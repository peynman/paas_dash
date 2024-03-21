import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminRoutes from '@peynman/press-vue-admin/routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: {
    ...AdminRoutes,
  },
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0,
    }
  },
})

export default router
