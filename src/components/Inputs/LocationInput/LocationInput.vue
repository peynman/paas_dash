<template>
  <v-input
    :label="label"
    :vertical="true"
    :error-messages="errorMessages"
    :rules="rules"
    :disabled="disabled"
    :value="internalValue"
  >
    <div v-if="open" style="width: 100%; height: 240px; direction: ltr; margin-top: 10px; position: relative; z-index: 1;">
      <l-map
        ref="map"
        :zoom="zoom"
        :center="[center.lat, center.lng]"
        :style="`min-width: ${mapWidth}; min-height: ${mapHeight}; position: relative; color: black;`"
        @dblclick="onMapClick"
      >
        <l-geosearch v-if="!hidePicker" :options="geoSearchOptions" />
        <l-marker
          v-if="internalValue && internalValue.lat && internalValue.lng"
          visible
          :draggable="!dontPick"
          :icon="icon"
          :lat-lng.sync="internalValue"
          @dragstart="dragging = true"
          @dragend="dragging = false"
        />
        <l-marker
          v-for="(loc, index) in extraLocations"
          :key="`marker-${index}`"
          :lat-lng="loc"
          :icon="loc.icon"
        />
        <l-tile-layer
          :url="tileProvider.url"
          :attribution="tileProvider.attribution"
          @ready="onMapReady"
        />
      </l-map>
      <v-btn
        v-if="!hidePicker"
        small
        absolute
        :loading="loading"
        style="bottom: 10px; left: 10px; z-index: 1000;"
        @click="getUserPosition"
      >
        {{ $t('components.admin.locationInput.myLocation') }}
      </v-btn>
    </div>
  </v-input>
</template>

<script>
  import Themeable from '../../../mixins/Themeable'
  import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
  import { OpenStreetMapProvider } from 'leaflet-geosearch'
  import LGeosearch from 'vue2-leaflet-geosearch'
  import { icon, Point } from 'leaflet'

  export default {
    name: 'LocationInput',
    components: {
      LMap,
      LTileLayer,
      LGeosearch,
      LMarker,
    },
    mixins: [Themeable],
    props: {
      label: String,
      rules: Array,
      errorMessages: Array,
      value: Object,
      disabled: Boolean,
      centerLat: Number,
      centerLong: Number,
      width: Number,
      height: Number,
      initZoom: Number,
      hidePicker: Boolean,
      dontPick: Boolean,
      extraLocations: Array,
      autoLocate: {
        type: Boolean,
        default: true,
      },
    },
    data: vm => ({
      tileProvider: {
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      },
      zoom: vm.initZoom ?? 14,
      viewPosition: { lat: vm.centerLat, lng: vm.centerLng },
      internalValue: vm.value,
      open: false,
      icon: icon({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        shadowSize: [20, 20],
        shadowAnchor: [5, 16],
        iconAnchor: [12, 36],
      }),
      geoSearchOptions: {
        provider: new OpenStreetMapProvider(),
        showMarker: false,
        autoClose: true,
      },
      address: '',
      dragging: false,
      loading: false,
      map: null,
    }),
    computed: {
      mapWidth () {
        return this.width || '240px'
      },
      mapHeight () {
        return this.height || '240px'
      },
      center () {
        if (this.internalValue && this.internalValue.lat && this.internalValue.lng) {
          return {
            lat: this.internalValue.lat,
            lng: this.internalValue.lng,
          }
        } else {
          return {
            lat: this.viewPosition?.lat || this.theme.admin.locationInput.centerLat,
            lng: this.viewPosition?.lng || this.theme.admin.locationInput.centerLng,
          }
        }
      },
    },
    watch: {
      value () {
        this.internalValue = this.value
      },
      dragging () {
        if (!this.dragging) {
          this.$emit('input', this.internalValue)
        }
      },
    },
    mounted () {
      if (this.internalValue?.lat) {
        this.viewPosition = { ...this.internalValue }
      }
      this.resetMap()
    },
    methods: {
      resetMap () {
        this.open = false
        setTimeout(() => {
          this.open = true
          this.$nextTick(() => {
            this.$refs.map.mapObject.on('geosearch/showlocation', this.onSearch)
          })
        }, 1000)
      },
      async onMapClick (value) {
        if (!this.dontPick) {
          // place the marker on the clicked spot
          this.internalValue = value.latlng
          this.$emit('input', this.internalValue)
        }
      },
      onMapReady (map) {
        this.map = map._map
        this.map.panBy(new Point(0, 80), { animate: false })
      },
      onSearch (value) {
        const loc = value.location
        this.internalValue = { lat: loc.y, lng: loc.x }
        this.$emit('input', this.internalValue)
      },
      async getUserPosition () {
        if (navigator.geolocation) {
          this.loading = true
          navigator.geolocation.getCurrentPosition(pos => {
            this.loading = false
            this.zoom = 18
            this.viewPosition = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            }
          })
        }
      },
    },
  }
</script>
