<template>
  <v-card>
    <v-card-title>{{ $t('components.admin.charts.dashboard.settings.title') }}</v-card-title>
    <v-card-text>
      <span class="caption">{{ $t('components.admin.charts.dashboard.settings.width') }}</span>
      <div class="d-flex flex-row">
        <v-autocomplete
          v-model="xs"
          :items="widthItems"
          class="me-1"
          :label="$t('components.admin.charts.dashboard.settings.xs')"
          clearable
          solo
          rounded
        />
        <v-autocomplete
          v-model="s"
          :items="widthItems"
          :label="$t('components.admin.charts.dashboard.settings.xs')"
          class="me-1"
          clearable
          solo
          rounded
        />
        <v-autocomplete
          v-model="m"
          :items="widthItems"
          :label="$t('components.admin.charts.dashboard.settings.m')"
          class="me-1"
          clearable
          solo
          rounded
        />
        <v-autocomplete
          v-model="l"
          :items="widthItems"
          :label="$t('components.admin.charts.dashboard.settings.l')"
          class="me-1"
          clearable
          solo
          rounded
        />
        <v-autocomplete
          v-model="xl"
          :items="widthItems"
          :label="$t('components.admin.charts.dashboard.settings.xl')"
          class="me-1"
          clearable
          solo
          rounded
        />
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" dark @click="onUpdateSettings">
        {{ $t('components.admin.charts.dashboard.settings.update') }}
      </v-btn>
      <v-spacer />
      <confirm-remove-dialog @remove="onRemoveFromPage">
        <template v-slot:activator="{on}">
          <v-btn color="red" dark v-on="on">{{ $t('components.admin.charts.dashboard.settings.remove') }}</v-btn>
        </template>
      </confirm-remove-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
  import ConfirmRemoveDialog from '../ConfirmDialog/ConfirmRemoveDialog.vue'

  export default {
    name: 'DashboardChartSettingsCard',
    components: { ConfirmRemoveDialog },
    props: {
      id: String,
      value: Object,
    },
    data: vm => ({
      xs: vm.value?.xs,
      s: vm.value?.xs,
      m: vm.value?.xs,
      l: vm.value?.xs,
      xl: vm.value?.xs,
      widthItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    }),
    watch: {
      value () {
        this.xs = this.value?.xs
        this.s = this.value?.s
        this.m = this.value?.m
        this.l = this.value?.l
        this.xl = this.value?.xl
      },
    },
    methods: {
      onRemoveFromPage () {
        this.$store.commit('admin/removeWidgetFromPage', this.id)
      },
      onUpdateSettings () {
        this.$emit('input', {
          xs: this.xs,
          s: this.s,
          m: this.m,
          l: this.l,
          xl: this.xl,
        })
      },
    },
  }
</script>
