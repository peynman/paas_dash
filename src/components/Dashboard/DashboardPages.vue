<template>
  <v-tabs-items v-model="currPage">
    <v-tab-item v-for="(page, index) in pages" :key="`dash-page-${index}-items`">
      <dashboard-widgets :widgets="page.widgets" />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
  import { mapGetters } from 'vuex'
  import DashboardWidgets from './DashboardWidgets.vue'

  export default {
    name: 'DashboardPages',
    components: {
      DashboardWidgets,
    },
    props: {
      value: [Number, String],
    },
    data: vm => ({
      currPage: vm.value,
    }),
    computed: {
      ...mapGetters('admin', [
        'pages',
      ]),
    },
    watch: {
      value () {
        this.currPage = this.value
      },
    },
  }
</script>
