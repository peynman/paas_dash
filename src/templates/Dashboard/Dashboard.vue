<template>
  <div :style="bodyStyles">
    <admin-navigation v-model="showAdminNav" />
    <admin-appbar @toggle-drawer="showAdminNav = !showAdminNav" :view-mode="viewMode" />
    <v-main :class="themeMainClass">
      <slot name="toolbar" />
      <v-container :fluid="fluidContainer" :class="themeContainerClass">
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<script>
  import AdminAppbar from '../../components/AppBar/AdminAppbar.vue'
  import AdminNavigation from '../../components/Navigation/AdminNavigation.vue'
  import Themeable from '@peynman/press-vue-core/mixins/Themeable'

  export default {
    name: 'Dashboard',
    components: { AdminNavigation, AdminAppbar },
    mixins: [Themeable],
    props: {
      mainClass: String,
      fluidContainer: Boolean,
      containerClass: String,
      styles: Object,
      viewMode: Boolean,
    },
    data: () => ({
      showAdminNav: false,
    }),
    computed: {
      themeMainClass () {
        return this.mainClass || this.theme.admin.body.mainClass
      },
      themeFluidContainer () {
        return this.fluidContainer !== undefined ? this.fluidContainer : this.theme.admin.body.fluid
      },
      themeContainerClass () {
        return this.containerClass !== undefined ? this.containerClass : this.theme.admin.body.containerClass
      },
      bodyStyles () {
        return this.styles !== undefined ? this.styles : this.theme.admin.body.styles
      },
    },
    mounted () {
      this.$vuetify.theme.dark = false
      this.updateVuetifyThemeColors(this.theme.admin.vuetify)
    },
  }
</script>
