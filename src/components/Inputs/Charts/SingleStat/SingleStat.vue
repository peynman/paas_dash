<template>
  <v-card :color="color" :dark="dark" :elevation="elevation">
    <v-system-bar :color="barColor">
      <v-dialog v-model="showSettings" max-width="766">
        <template v-slot:activator="{on}">
          <v-btn icon x-small @click="showSettings = !showSettings" v-on="on"><v-icon x-small>mdi-cog</v-icon></v-btn>
        </template>
        <windowed-chart-settings-card
          :id="id"
          v-model="querySettings"
          :form="settingsForm"
          :bindings="settingsBindings"
          :widget-desc="widgetDesc"
          :admin-mode="adminMode"
        />
      </v-dialog>
      <span class="text-caption ms-2">{{ title }}</span>
      <v-chip label outlined x-small style="position: absolute; top: 25px; right: 1px;">{{ timeRangeString }}</v-chip>
    </v-system-bar>
    <v-progress-linear v-if="loading" indeterminate :color="loadingColor" />
    <v-card-title>
      <v-card class="pa-3" :elevation="iconElevation" :color="iconBackColor" label :style="iconChipStyle">
        <v-icon large :color="iconColor">{{ icon }}</v-icon>
      </v-card>
      <div class="d-flex flex-column">
        <div v-if="!loading" class="d-flex flex-row align-center justify-start">
          <span class="text-h4">{{ $n(accValue, 'decimal') }}</span>
          <span class="text-subtitle-1 ms-1">{{ unit }}</span>
        </div>
        <div v-if="hasAlternate" class="d-flex flex-row align-center justify-start">
          <span class="text-subtitle-2">{{ $t('components.admin.charts.singleStat.alternateValue') }}</span>
          <span class="text-h6 ms-1">{{ $n(alternateAccValue, 'decimal') }}</span>
          <span class="text-subtitle-1 ms-1">{{ unit }}</span>
        </div>
        <v-chip v-if="hasAlternate && showAlternatePercent" outlined label x-small class="d-flex flex-row align-center justify-start">
          <span class="caption">{{ alternateChangeString }}</span>
          <v-icon :color="alternateChangeColor">{{ alternateChangeIcon }}</v-icon>
          <span class="caption">{{ $n(Math.abs(alternateChangePercent), 'percent') }}</span>
          <span class="caption ms-1">{{ $t('components.admin.charts.singleStat.alternateMessage') }}</span>
        </v-chip>
      </div>
    </v-card-title>
    <canvas v-if="showChart" ref="chart" style="position: absolute; bottom: 0; left: 0;" width="6" height="1" />
  </v-card>
</template>

<script>
  import Chart from 'chart.js/auto'
  import WindowedChartSettingsCard from '../WindowedChartSettingsCard.vue'

  export default {
    name: 'SingleStat',
    components: {
      WindowedChartSettingsCard,
    },
    props: {
      id: String,
      label: String,
      unit: String,
      icon: String,
      iconBackColor: String,
      iconColor: String,
      barColor: String,
      loadingColor: String,
      color: String,
      title: String,
      dark: Boolean,
      loading: Boolean,
      alternateLabel: String,
      showChart: {
        type: Boolean,
        default: true,
      },
      chartMode: {
        type: String,
        default: 'bar',
      },
      chartColor: String,
      showAlternatePercent: {
        type: Boolean,
        default: true,
      },
      showAlternate: {
        type: Boolean,
        default: true,
      },
      alternateColor: String,
      iconElevation: {
        type: Number,
        default: 1,
      },
      elevation: {
        type: Number,
        default: 2,
      },
      alternateLabels: Array,
      labels: Array,
      value: {
        type: [Array, Number],
      },
      alternateValue: {
        type: [Array, Number],
      },
      settings: {
        type: Object,
      },
      settingsForm: Array,
      settingsBindings: Array,
      widgetDesc: Object,
      adminMode: Boolean,
    },
    data: vm => ({
      chartObj: null,
      showSettings: false,
      querySettings: vm.settings,
      isDirty: false,
    }),
    computed: {
      iconChipStyle () {
        return {
          position: 'absolute',
          left: '6px',
          top: '5px',
        }
      },
      accValue () {
        if (Array.isArray(this.value)) {
          return this.value.reduce((acc, n) => acc + n, 0)
        }

        return this.value
      },
      alternateAccValue () {
        if (Array.isArray(this.alternateValue)) {
          return this.alternateValue.reduce((acc, n) => acc + n, 0)
        }

        return this.alternateValue
      },
      hasAlternate () {
        return this.showAlternate && this.alternateValue
      },
      alternateChangePercent () {
        if (this.alternateAccValue > 0) {
          return (this.accValue / this.alternateAccValue - 1)
        } else {
          return this.accValue
        }
      },
      alternateChangeColor () {
        return this.alternateChangePercent > 0 ? 'green' : 'orange'
      },
      alternateChangeIcon () {
        return this.alternateChangePercent > 0 ? 'mdi-chevron-double-up' : 'mdi-chevron-double-down'
      },
      alternateChangeString () {
        return this.alternateChangePercent > 0 ? this.$t('components.admin.charts.singleStat.increase') : this.$t('components.admin.charts.singleStat.decrease')
      },
      primaryChartColor () {
        return this.chartColor ?? 'rgba(54, 162, 235, 0.2)'
      },
      secondaryChartColor () {
        return this.alternateColor ?? 'rgba(201, 203, 207, 0.2)'
      },
      timeRangeString () {
        if (this.querySettings?.timeRangeMode !== 'custom') {
          const mode = this.querySettings?.timeRangeMode
          const n = this.$n(mode?.substring(0, mode.length - 1), 'decimal')
          if (mode?.endsWith('h')) {
            return this.$t('components.admin.charts.singleStat.modes.hour', { n })
          } else if (mode?.endsWith('d')) {
            return this.$t('components.admin.charts.singleStat.modes.day', { n })
          } else if (mode?.endsWith('w')) {
            return this.$t('components.admin.charts.singleStat.modes.week', { n })
          } else if (mode?.endsWith('m')) {
            return this.$t('components.admin.charts.singleStat.modes.month', { n })
          }
        }

        return this.$t('components.admin.charts.singleStat.modes.custom')
      },
    },

    watch: {
      querySettings (settings) {
        this.showSettings = false
        this.$emit('update-reports', settings)
      },
      alternateValue () {
        this.isDirty = true
      },
      value () {
        this.isDirty = true
      },
      labels () {
        this.isDirty = true
      },
      isDirty () {
        if (this.isDirty) {
          this.$nextTick(() => {
            this.updateChart()
          })
        }
      },
    },

    mounted () {
      this.updateChart()
    },

    methods: {
      updateChart () {
        if (this.showChart && this.value) {
          this.isDirty = false
          const datasets = [{
            label: this.label,
            labels: this.labels ?? this.value.map(() => ''),
            data: this.value,
            backgroundColor: this.primaryChartColor,
            borderColor: this.primaryChartColor,
          }]

          if (this.alternateValue && this.showAlternate) {
            datasets.push({
              label: this.alternateLabel ?? this.$t('components.admin.charts.singleStat.alternateLabel', { l: this.label }),
              labels: this.alternateLabels ?? this.alternateValue.map(() => ''),
              data: this.alternateValue,
              backgroundColor: this.alternateColor,
              borderColor: this.alternateColor,
            })
          }

          const chartElement = this.$refs.chart
          if (this.chartObj) {
            this.chartObj.destroy()
          }
          if (chartElement) {
            this.chartObj = new Chart(chartElement.getContext('2d'), {
              type: 'bar',
              data: {
                labels: this.labels ?? this.value.map(() => ''),
                datasets,
              },
              options: {
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      title (item) {
                        return item[0].dataset.labels[item[0].dataIndex]
                      },
                    },
                  },
                },
                scales: {
                  xAxis: {
                    display: false,
                  },
                  yAxis: {
                    display: false,
                  },
                },
              },
            })
          }
        }
      },
    },
  }
</script>
