<template>
  <v-list-group v-if="item.children && item.children.length > 0" :sub-group="subGroup">
    <template v-slot:activator>
      <heirarchy-select-input-link
        :item="item"
        :is-filterable="isFilterable"
        :is-single-select="isSingleSelect"
        class="px-0"
        :value="internalValue[item.id]"
        @input="onValueChanged($event, item)"
      />
    </template>
    <heirarchy-select-input-item
      v-for="subitem in item.children"
      :key="subitem.id"
      v-model="internalValue"
      :item="subitem"
      :is-filterable="isFilterable"
      :is-single-select="isSingleSelect"
      sub-group
      @input="onChildValueChanged"
    />
  </v-list-group>
  <heirarchy-select-input-link
    v-else
    :item="item"
    :is-filterable="isFilterable"
    :is-single-select="isSingleSelect"
    :value="internalValue[item.id]"
    @input="onValueChanged($event, item)"
    @single="onValueSingle($event, item)"
  />
</template>

<script>
  import HeirarchySelectInputLink from './HeirarchySelectInputLink.vue'

  export default {
    name: 'HeirarchySelectInputItem',
    components: { HeirarchySelectInputLink },
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
      isFilterable: Function,
      isSingleSelect: Boolean,
      value: Object,
      subGroup: Boolean,
    },
    data: vm => ({
      internalValue: vm.value ?? {},
    }),
    watch: {
      value () {
        this.internalValue = this.value ?? {}
      },
    },
    methods: {
      onValueSingle (value, item) {
        this.$emit('input', {
          [item.id]: value,
        }, true)
      },
      onValueChanged (value, item) {
        if (this.isSingleSelect) {
          this.$emit('input', {
            [item.id]: value,
          }, false)
        } else {
          this.$emit('input', {
            ...this.internalValue,
            [item.id]: value,
          }, false)
        }
      },
      onChildValueChanged (v, s) {
        this.$emit('input', { ...this.internalValue }, s)
      },
    },
  }
</script>
