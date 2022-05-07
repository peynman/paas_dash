<template>
  <dashboard>
    <dashboard-toolbar v-model="currTab" />
    <dashboard-pages v-model="currTab" class="mt-3" />
    <div v-if="!hasWidgets" class="mt-3 d-flex flex-column justify-center align-center fill-height">
      <v-img :src="theme.admin.dashboard.emptyDashboardImage" width="300" height="300" contain />
      <v-alert type="info" border="bottom" color="blue-grey darken-3">
        <div class="d-flex flex-column">
          {{ $t('components.admin.dashboard.empty') }}
          <span class="caption">{{ $t('components.admin.dashboard.addMessage') }}</span>
        </div>
      </v-alert>
    </div>
  </dashboard>
</template>

<script>
  import FormValidations from '@peynman/press-vue-core/mixins/FormValidations'
  import Themeable from '@peynman/press-vue-core/mixins/Themeable'
  import UserCrud from '@peynman/press-vue-core/crud/User'
  import Dashboard from '../templates/Dashboard/Dashboard.vue'
  import DashboardToolbar from '../components/Dashboard/DashboardToolbar.vue'
  import DashboardPages from '../components/Dashboard/DashboardPages.vue'

  export default {
    name: 'AdminDashboard',
    components: {
      Dashboard,
      DashboardToolbar,
      DashboardPages,
    },
    mixins: [
      FormValidations(),
      Themeable,
    ],
    data: () => ({
      currTab: 0,
    }),
    computed: {
      userCrud () {
        return UserCrud(this)
      },
      hasWidgets () {
        return this.$store.getters['admin/pages'].reduce((v, p) => {
          return v + p.widgets?.length
        }, 0) > 0
      },
    },
  }
</script>
