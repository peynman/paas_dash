<template>
  <v-list-item @click="onSelectSingleSelect">
    <v-list-item-icon class="my-auto" v-if="!isSingleSelect">
      <v-simple-checkbox v-if="canFilterBasedOn(item)" :value="value" @input="onChange" />
      <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  export default {
    name: 'HeirarchySelectInputLink',
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
      isFilterable: Function,
      isSingleSelect: Boolean,
      value: Boolean,
    },
    data: vm => ({
      internalValue: vm.value,
    }),
    watch: {
      value () {
        this.internalValue = this.value
      },
    },
    methods: {
      onChange () {
        this.$emit('input', !this.internalValue)
      },
      onSelectSingleSelect () {
        if (this.isSingleSelect) {
          this.$emit('input', true)
        } else {
          this.$emit('single', true)
        }
      },
      canFilterBasedOn (link) {
        if (this.isFilterable) {
          return this.isFilterable(link)
        }
        return true
      },
    },
  }
</script>
