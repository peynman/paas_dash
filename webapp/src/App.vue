<template>
  <div id="app">
    <v-app :style="style">
      <router-view />
    </v-app>
  </div>
</template>

<script>
  import Themeable from '@peynman/press-vue-core/mixins/Themeable'
  import WebsiteTheme from '../../src/theme'

  export default {
    mixins: [
      Themeable,
    ],
    computed: {
      style () {
        return this.theme.admin?.body?.style ?? {}
      },
      class () {
        return this.theme.admin?.body?.class ?? ''
      },
    },
    created () {
      this.$store.commit('theme/appendTheme', WebsiteTheme)

      if (this.$config.autoSaturate) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.$vuetify.theme.dark = true
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
          this.$vuetify.theme.dark = event.matches
        })
        if (!this.$vuetify.theme.isDark) {
          const hours = new Date().getHours()
          this.$vuetify.theme.dark =
            hours < (this.theme.admin?.dayTime?.from ?? 6) &&
            hours >= (this.theme.admin?.dayTime?.to ?? 20)
        }
      }
    },
  }
</script>
