<template>
  <v-card light>
    <v-card-title>
      <span>{{ $t('components.admin.charts.singleStat.title') }}</span>
      <v-spacer />
      <v-tooltip v-if="!adminMode" top>
        <template v-slot:activator="onTooltip">
          <v-dialog v-model="dashboardUpdate" max-width="766">
            <template v-slot:activator="{on}">
              <v-btn icon v-on="{...on, ...onTooltip.on}"><v-icon>mdi-desktop-mac-dashboard</v-icon></v-btn>
            </template>
            <add-chart-to-dashboad-card :widget="widgetDesc" />
          </v-dialog>
        </template>
        {{ $t('components.admin.charts.singleStat.dashboardUpdate') }}
      </v-tooltip>
      <v-tooltip v-else top>
        <template v-slot:activator="onTooltip">
          <v-dialog v-model="adminUpdate" max-width="766">
            <template v-slot:activator="{on}">
              <v-btn color="warning" icon v-on="{ ...on, ...onTooltip.on}"><v-icon>mdi-desktop-mac</v-icon></v-btn>
            </template>
            <dashboard-chart-settings-card :id="id" v-model="cols" />
          </v-dialog>
        </template>
        {{ $t('components.admin.charts.singleStat.adminUpdate') }}
      </v-tooltip>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-select
        v-model="timeRangeMode"
        :items="timeRangeOptions"
        :label="$t('components.admin.charts.singleStat.timeRangeMode')"
      />
      <v-timestamp-input
        v-if="timeRangeMode === 'custom'"
        v-model="dateRange"
        :label="$t('components.admin.charts.singleStat.dateRange')"
        range
      />
      <v-select
        v-model="aggregateMode"
        :items="aggregateOptions"
        :label="$t('components.admin.charts.singleStat.aggregateMode')"
      />
      <v-checkbox
        v-model="showAlternate"
        :label="$t('components.admin.charts.singleStat.showAlternate')"
      />
      <v-radio-group
        v-if="showAlternate"
        v-model="alternateMode"
      >
        <v-radio :label="$t('components.admin.charts.singleStat.alternateOptionsSame')" value="same" />
        <v-radio :label="$t('components.admin.charts.singleStat.alternateOptionsCustom')" value="custom" />
      </v-radio-group>
      <v-timestamp-input
        v-if="showAlternate && alternateMode === 'custom'"
        v-model="alternateStart"
        :label="$t('components.admin.charts.singleStat.alternateStart')"
      />
      <v-divider />
      <v-form-renderer v-model="formValues" :form="form" :bindings="bindings" />
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn dark color="green" @click="updateReport">{{ $t('components.admin.charts.singleStat.update') }}</v-btn>
      <v-spacer />
      <v-btn color="secondary" text @click="saveSettings">
        {{ $t('components.admin.charts.singleStat.save') }}
      </v-btn>
      <v-btn color="warning" text @click="resetSettings">
        {{ $t('components.admin.charts.singleStat.reset') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import AddChartToDashboadCard from './AddChartToDashboadCard.vue'
  import DashboardChartSettingsCard from './DashboardChartSettingsCard'

  export default {
    name: 'WindowedChartSettingsCard',
    components: {
      AddChartToDashboadCard,
      DashboardChartSettingsCard,
    },
    props: {
      id: String,
      value: Object,
      form: Array,
      bindings: Array,
      widgetDesc: Object,
      adminMode: Boolean,
    },
    data: vm => ({
      timeRangeMode: vm.value?.timeRangeMode,
      aggregateMode: vm.value?.aggregateMode,
      dateRange: vm.value?.dateRange,
      showAlternate: vm.value?.showAlternate,
      alternateStart: vm.value?.alternateStart,
      alternateMode: vm.value?.alternateMode,
      formValues: vm.value?.formValues,
      cols: vm.value?.cols ?? {},
      dashboardUpdate: false,
      adminUpdate: false,
    }),
    computed: {
      widgetPageName () {
        return this.widgetDesc?.name
      },
      timeRangeOptions () {
        return [
          {
            text: this.$t('components.admin.charts.singleStat.modes.custom'),
            value: 'custom',
          },
          ...[1, 2, 3, 4, 5, 6, 8, 10, 12, 24].map(h => ({
            text: this.$t('components.admin.charts.singleStat.modes.hour', { n: h }),
            value: `${h}h`,
          })),
          ...[1, 2, 3, 4, 5, 6].map(h => ({
            text: this.$t('components.admin.charts.singleStat.modes.day', { n: h }),
            value: `${h}d`,
          })),
          ...[1, 2, 3, 4].map(h => ({
            text: this.$t('components.admin.charts.singleStat.modes.week', { n: h }),
            value: `${h}w`,
          })),
          ...[1, 2, 3, 4, 5, 6, 8, 10, 12].map(h => ({
            text: this.$t('components.admin.charts.singleStat.modes.month', { n: h }),
            value: `${h}m`,
          })),
          ...[1, 2, 3, 4, 5, 6].map(h => ({
            text: this.$t('components.admin.charts.singleStat.modes.year', { n: h }),
            value: `${h}y`,
          })),
        ]
      },
      aggregateOptions () {
        const options = []
        if (this.timeRangeMode === 'custom') {
          options.push(...[10, 15, 30].map(v => ({
            text: this.$t('components.admin.charts.singleStat.modes.minute', { n: v }),
            value: `${v}min`,
          })))
          options.push(...[1, 2, 3, 6].map(v => ({
            text: this.$t('components.admin.charts.singleStat.modes.hour', { n: v }),
            value: `${v}h`,
          })))
          options.push(...[1].map(v => ({
            text: this.$t('components.admin.charts.singleStat.modes.day', { n: v }),
            value: `${v}d`,
          })))
          options.push(...[1].map(v => ({
            text: this.$t('components.admin.charts.singleStat.modes.week', { n: v }),
            value: `${v}w`,
          })))
          options.push(...[1, 2].map(v => ({
            text: this.$t('components.admin.charts.singleStat.modes.year', { n: v }),
            value: `${v}y`,
          })))
        } else {
          if (this.timeRangeMode?.endsWith('h')) {
            if (this.containsAnyOf(this.timeRangeMode, ['1h', '2h', '3h', '4h', '5h'])) {
              options.push(...[10, 15, 30].map(v => ({
                text: this.$t('components.admin.charts.singleStat.modes.minute', { n: v }),
                value: `${v}min`,
              })))
            } else {
              options.push(...[1].map(v => ({
                text: this.$t('components.admin.charts.singleStat.modes.hour', { n: v }),
                value: `${v}h`,
              })))
            }
          } else if (this.timeRangeMode?.endsWith('d')) {
            if (this.containsAnyOf(this.timeRangeMode, ['1d', '2d'])) {
              options.push(...[1, 2, 3, 6].map(v => ({
                text: this.$t('components.admin.charts.singleStat.modes.hour', { n: v }),
                value: `${v}h`,
              })))
            } else {
              options.push(...[1].map(v => ({
                text: this.$t('components.admin.charts.singleStat.modes.day', { n: v }),
                value: `${v}d`,
              })))
            }
          } else if (this.timeRangeMode?.endsWith('w')) {
            options.push(...[1].map(v => ({
              text: this.$t('components.admin.charts.singleStat.modes.day', { n: v }),
              value: `${v}d`,
            })))
          } else if (this.timeRangeMode?.endsWith('m')) {
            if (this.containsAnyOf(this.timeRangeMode, ['1m', '2m'])) {
              options.push(...[1, 7].map(v => ({
                text: this.$t('components.admin.charts.singleStat.modes.day', { n: v }),
                value: `${v}d`,
              })))
            } else {
              options.push(...[1].map(v => ({
                text: this.$t('components.admin.charts.singleStat.modes.month', { n: v }),
                value: `${v}m`,
              })))
            }
          } else if (this.timeRangeMode?.endsWith('y')) {
            if (this.containsAnyOf(this.timeRangeMode, ['1y'])) {
              options.push(...[1, 3, 6].map(v => ({
                text: this.$t('components.admin.charts.singleStat.modes.month', { n: v }),
                value: `${v}m`,
              })))
            } else {
              options.push(...[1, 3, 6].map(v => ({
                text: this.$t('components.admin.charts.singleStat.modes.month', { n: v }),
                value: `${v}m`,
              })))
            }
          }
        }
        return options
      },
    },
    watch: {
      value: {
        deep: true,
        handler () {
          this.timeRangeMode = this.value?.timeRangeMode
          this.aggregateMode = this.value?.aggregateMode
          this.dateRange = this.value?.dateRange
          this.showAlternate = this.value?.showAlternate
          this.alternateStart = this.value?.alternateStart
          this.alternateMode = this.value?.alternateMode
          this.cols = this.value?.cols
        },
      },
    },
    methods: {
      containsAnyOf (string, search) {
        if (Array.isArray(search)) {
          for (let i = 0; i < search.length; i++) {
            if (string.includes(search[i])) {
              return true
            }
          }
        }

        return false
      },
      updateReport () {
        this.$emit('input', {
          timeRangeMode: this.timeRangeMode,
          aggregateMode: this.aggregateMode,
          dateRange: this.dateRange,
          showAlternate: this.showAlternate,
          alternateStart: this.alternateStart,
          alternateMode: this.alternateMode,
          cols: this.cols,
        })
      },
      saveSettings () {

      },
      resetSettings () {

      },
    },
  }
</script>
