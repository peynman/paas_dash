<template>
  <v-card>
    <v-card-title>{{ $t('components.admin.charts.dashboard.title') }}</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-select
          v-model="page"
          :label="$t('components.admin.charts.dashboard.pageName')"
          :items="pages"
          :rules="[ getRequiredRule() ]"
        />
        <v-dialog v-model="showAddPage" max-width="766">
          <template v-slot:activator="{on}">
            <v-btn text v-on="on">{{ $t('components.admin.charts.dashboard.addPage') }}</v-btn>
          </template>
          <dashboard-page-edit
            v-model="pageData"
            @input="onAddPage"
          />
        </v-dialog>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn dark color="green" @click="onAddWidgetToDashboard">{{ $t('components.admin.charts.dashboard.add') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import FormValidations from '@peynman/press-vue-core/mixins/FormValidations'
  import DashboardPageEdit from '../../Dashboard/DashboardPageEdit.vue'

  export default {
    name: 'DashboardUpdateCard',
    components: {
      DashboardPageEdit,
    },
    mixins: [
      FormValidations(),
    ],
    props: {
      widget: Object,
    },
    data: vm => ({
      page: null,
      valid: false,
      pageData: {},
      showAddPage: false,
    }),
    computed: {
      pages () {
        return this.$store.getters['admin/pages'].map(p => ({
          text: p.title,
          value: p.name,
        }))
      },
    },
    methods: {
      onAddPage (data) {
        this.showAddPage = false
        this.$store.commit('admin/addPage', data)
        this.pageData = {}
      },
      onAddWidgetToDashboard () {
        this.$refs.form.validate()

        if (this.valid) {
          this.$refs.form.resetValidation()
          this.$store.commit('admin/addWidgetToPage', {
            widget: this.widget,
            name: this.page,
          })
          this.page = null
        }
      },
    },
  }
</script>
