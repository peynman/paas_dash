import '../../src/sass/index.scss'

import Vue from 'vue'
import PressApp from '@peynman/press-vue-admin/mixins/PressApp'

import App from './App.vue'
import store from './store'
import router from './plugins/router'
import vuetify from './plugins/vuetify'
import press from './plugins/press'
import i18n from './plugins/i18n'
import Config from './plugins/config'

import './plugins/echo'
import './plugins/externals'

Vue.config.productionTip = false
Vue.use(Config)

new Vue({
  router,
  store,
  i18n,
  vuetify,
  $press: press(store),
  mixins: [PressApp],
  render: h => h(App),
}).$mount('#app')
