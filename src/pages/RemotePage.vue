<template>
  <div>
    <v-fade-transition>
      <v-overlay
        :value="isPageLoading"
        :opacity="overlayOpacity"
        style="z-index: 1000;"
        :color="overlayColor"
      >
        <v-progress-circular indeterminate />
      </v-overlay>
    </v-fade-transition>
    <v-schema-renderer
      :children="bodyChildren"
      :components-dictionary="widgetsDictionary"
      :rules-dictionary="rulesDictionary"
      :pre-processor="preProcessWidget"
    />
  </div>
</template>

<script>
  import Themeable from '@peynman/press-vue-core/mixins/Themeable'
  import FormValidations from '@peynman/press-vue-core/mixins/FormValidations'
  import WidgetsRenderer from '@peynman/press-vue-core/mixins/WidgetsRenderer'

  export default {
    name: 'RemotePage',
    mixins: [
      Themeable,
      WidgetsRenderer,
      FormValidations(),
    ],
    props: {
    },
    data: vm => ({
      isPageLoading: false,
      page: null,
      schema: null,
      removeHook: null,
    }),
    computed: {
      bodyChildren () {
        return this.page?.body?.content?.children ?? []
      },
      overlayOpacity () {
        return this.theme?.admin?.overlay?.opacity
      },
      overlayColor () {
        return this.theme?.admin?.overlay?.color
      }
    },
    mounted () {
      this.onLoadRemotePage()

      this.removeHook = this.$router.afterEach((to, from) => {
        if (to.matched.length > 0) {
          if (to.matched[0].name === 'global') {
            this.onLoadRemotePage()
          }
        }
      })
    },
    unmounted () {
      if (this.removeHook !== null) {
        console.log('removed hook')
        this.removeHook()
        this.removeHook = null
      }
    },
    methods: {
      onPageLoaded () {
        this.isPageLoading = false
        if (this.schema && this.schema?.schema?.theme) {
          this.$store.commit('theme/appendTheme', this.schema.schema.theme)
        }

        if (this.page?.body.title) {
          window.document.title = this.page.body.title
        }
      },
      onLoadRemotePage () {
        this.isPageLoading = true

        if (window.PageConfig && window.PageConfig.page?.slug === this.$route.path) {
          this.page = window.PageConfig.page
          this.shcema = window.PageConfig.schema
          this.onPageLoaded()
          return
        }

        this.$store.dispatch('pages/loadPage', this.$route.path)
          .then(json => {
            this.page = json.page
            this.schema = json.schema
            this.onPageLoaded()
          })
          .catch(err => {
            console.log(err)
            if (err.status === 404) {
              this.$router.replace('/404')
            } else {
              // this.$router.replace('/500')
            }
          })
      },
    },
  }
</script>
