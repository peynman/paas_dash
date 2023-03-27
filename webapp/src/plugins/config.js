import Config from '../../config'

export default {
  // called by Vue.use(FirstPlugin)
  install (Vue, options) {
    Vue.mixin({
      computed: {
        $config () {
          return Config(this)
        },
      },
    })
  },
}
