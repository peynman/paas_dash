<template>
  <v-card :color="color" :dark="dark" :elevation="elevation">
    <v-system-bar :color="barColor">
      <slot name="settings" />
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
