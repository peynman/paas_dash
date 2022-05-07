<template>
  <div class="d-flex align-center justify-center">
    <div v-if="loading" class="fill-width">
      <slot v-if="hasLoadingSlot" name="loading" />
      <v-progress-circular v-else indeterminate :color="color" />
    </div>
    <div v-else-if="!items || items.length === 0">
      <slot v-if="$slots.empty" name="empty" />
      <span v-else>{{ $t('components.admin.paginatedMasonry.empty') }}</span>
    </div>
    <div v-else class="fill-width d-flex flex-column">
      <div
        v-masonry="id"
        origin-left="false"
        transition-duration="0.3s"
        item-selector=".paginated-item"
      >
        <v-col
          v-for="(item, i) in items"
          :key="`paginated-masonry-${id}-${i}`"
          v-masonry-tile
          class="paginated-item pa-1"
          :cols="cols"
          :sm="sm"
          :md="md"
          :lg="lg"
          :xl="xl"
        >
          <slot name="item" :item="item" />
        </v-col>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PaginatedMasonry',
    props: {
      id: String,
      items: {
        type: Array,
        default: () => [],
      },
      loading: Boolean,
      cols: Number,
      color: String,
      sm: Number,
      md: Number,
      lg: Number,
      xl: Number,
    },
    computed: {
      hasLoadingSlot () {
        return this.$slots.loading || this.$scopedSlots.loading
      },
    },
    methods: {
      redraw () {
        console.log('redraw masonry')
        this.$redrawVueMasonry(this.id)
      },
    },
  }
</script>
