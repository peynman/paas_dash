import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import en from 'vuetify/lib/locale/en'
import fa from 'vuetify/lib/locale/fa'

Vue.use(Vuetify)

export default new Vuetify({
  rtl: true,
  lang: {
    locales: { en, fa },
    current: 'fa',
  },
  theme: {
    options: {
      customProperties: true,
    },
    dark: false,
  },
})
