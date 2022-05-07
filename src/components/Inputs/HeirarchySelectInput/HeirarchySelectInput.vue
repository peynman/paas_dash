<template>
  <v-menu
    v-model="menu"
    offset-y
    left
    :close-on-content-click="false"
    :color="color"
    :dark="dark"
    :light="light"
    max-height="300"
    min-width="250"
  >
    <template v-slot:activator="{on}">
      <slot name="activator" :on="on" />
    </template>
    <v-list
      dense
    >
      <heirarchy-select-input-item
        v-for="item in items"
        :key="item.id"
        :item="item"
        :is-filterable="isFilterable"
        :is-single-select="isSingleSelect"
        :value="internalValue"
        @input="onHierarchyChanged"
      />
      <v-progress-circular v-if="loading" class="mx-3" indeterminate size="16" width="2" />
      <slot v-if="!loading" />
    </v-list>
  </v-menu>
</template>

<script>
  import HeirarchySelectInputItem from './HeirarchySelectInputItem.vue'

  export default {
    name: 'HeirarchySelectInput',
    components: {
      HeirarchySelectInputItem,
    },
    props: {
      isFilterable: Function,
      isSingleSelect: Boolean,
      title: String,
      color: String,
      dark: Boolean,
      light: Boolean,
      value: Object,
      loading: Boolean,
      items: Array,
    },
    data: vm => ({
      internalValue: vm.value ?? {},
      menu: false,
    }),
    watch: {
      value () {
        this.internalValue = this.value ?? {}
      },
    },
    methods: {
      onHierarchyChanged (h, s) {
        if (this.isSingleSelect || s) {
          this.$emit('input', {
            ...h,
          })
        } else {
          this.$emit('input', {
            ...this.internalValue,
            ...h,
          })
        }
      },
    },
  }
</script>
