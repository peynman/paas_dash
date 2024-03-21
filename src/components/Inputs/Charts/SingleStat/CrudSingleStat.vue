<template>
  <single-stat
    :id="id"
    :icon-back-color="iconBackColor"
    :icon-color="iconColor"
    :bar-color="barColor"
    :loading-color="loadingColor"
    :color="color"
    :dark="dark"
    show-chart
    :chart-mode="chartMode"
    :chart-color="chartColor"
    :show-alternate-percent="showAlternatePercent"
    :alternate-color="alternateColor"
    :icon-elevation="iconElevation"
    :admin-mode="adminMode"
    :elevation="elevation"
    :show-alternate="showAlternate"

    :unit="apiUnit"
    :icon="apiIcon"
    :title="apiTitle"
    :label="apiTitle"
    :labels="reportLabels"
    :value="reportValue"
    :loading="isReportLoading"
    :alternate-labels="alternateReportLabels"
    :alternate-value="alternateReportValue"
    :settings="reportSettings"
    :settings-form="apiForm"
    :settings-bindings="apiBindings"
    :widget-desc="apiWidgetDesc"
    @update-reports="onUpdateCrudReport"
  />
</template>

<script>
  import SingleStat from './SingleStat.vue'
  import ChartSettings from '../../../../mixins/ChartSettings'
  import TimestampFormatter from '../../../../mixins/TimestampFormatter'

  export default {
    name: 'CrudSingleStat',
    components: {
      SingleStat,
    },
    mixins: [
      SingleStat,
      ChartSettings,
      TimestampFormatter,
    ],
    props: {
      api: Object,
      crud: String,
    },
    data: vm => ({
      isReportLoading: false,
      alternateReportValue: null,
      alternateReportLabels: null,
      reportValue: null,
      reportLabels: null,
    }),

    computed: {
      apiTitle () {
        return this.api?.title
      },
      apiIcon () {
        return this.api?.icon
      },
      apiUnit () {
        return this.api?.unit
      },
      apiForm () {
        return this.api?.form
      },
      apiBindings () {
        return this.api?.bindings
      },
      apiWidgetDesc () {
        return {
          crud: this.crud,
          name: this.api?.name,
          component: this.$options.name,
        }
      },
    },

    watch: {
      api () {
        this.fetchReports()
      },
    },

    mounted () {
      console.log('refresh', this)
      this.fetchReports()
    },

    methods: {
      fetchReports () {
        if (this.api) {
          this.isReportLoading = true
          this.api.fetchReports(this, this.api, {
            from: this.from,
            to: this.to,
            aggregate: this.aggregate,
            showAlternate: this.reportSettings.showAlternate,
            alternateFrom: this.alternateFrom,
            alternateTo: this.alternateTo,
          })
            .then(reports => {
              console.log(reports)
              this.reportValue = reports[0].values
              this.reportLabels = reports[0].labels
              if (reports.length > 1) {
                this.alternateReportValue = reports[1].values
                this.alternateReportLabels = reports[1].labels
              }
            })
            .finally(() => {
              this.isReportLoading = false
            })
        }
      },
    },
  }
</script>
