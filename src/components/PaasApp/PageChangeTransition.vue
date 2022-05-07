<template>
  <v-fade-transition>
    <v-overlay
      :value="isPageLoading"
      :opacity="0.8"
      style="z-index: 1000;"
    >
      <v-progress-circular indeterminate />
    </v-overlay>
  </v-fade-transition>
</template>

<script>
  import User from '@peynman/press-vue-core/mixins/User'

  export default {
    name: 'PageChangeTransition',
    mixins: [
      User,
    ],
    data: vm => ({
      isPageLoading: false,
    }),
    created () {
      this.$router.beforeResolve((to, from, next) => {
        this.isPageLoading = true

        if (to.path.startsWith('/admin') && to.path !== '/admin/signin') {
          if (!this.isAdmin) {
            return next({ path: '/admin/signin?return=' + to.path })
          }
        }

        next()
      })
      this.$router.afterEach((to, from) => {
        this.isPageLoading = false
      })
    },
  }
</script>
