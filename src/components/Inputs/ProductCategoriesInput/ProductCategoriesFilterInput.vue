<template>
  <heirarchy-select-input
    :loading="isProductCategoriesLoading"
    :items="categories"
    :color="color"
    :dark="dark"
    :light="light"
    :title="title"
    :is-filterable="isFilterable"
    :is-single-select="isSingleSelect"
    :value="filters"
    @input="onHierarchyChanged"
  >
    <template v-slot:activator="{on}">
      <slot v-if="hasActivator" name="activator" :on="on" />
      <v-btn v-else :loading="isProductCategoriesLoading" text v-on="on">{{ title }}</v-btn>
    </template>
    <slot />
  </heirarchy-select-input>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ProductCategories from '../../../mixins/ProductCategories'
  import HeirarchySelectInput from '../HeirarchySelectInput/HeirarchySelectInput.vue'
  function getNormalizedValues (value) {
    return Array.isArray(value) ? value.reduce((dic, c) => {
      dic[c.id] = true
      return dic
    }, {}) : value ?? {}
  }

  export default {
    name: 'ProductCategoriesFilterInput',
    components: {
      HeirarchySelectInput,
    },
    mixins: [ProductCategories],
    props: {
      filterFunction: {
        type: Function,
        default: () => c => true,
      },
      isFilterable: {
        type: Function,
        default: () => c => true,
      },
      isSingleSelect: Boolean,
      title: String,
      color: String,
      dark: Boolean,
      light: Boolean,
      value: [Object, Array],
      returnObject: Boolean,
    },
    data: vm => ({
      categories: [],
      filters: getNormalizedValues(vm.value),
    }),
    computed: {
      ...mapGetters('repos', [
        'isProductCategoriesLoading',
      ]),
      hasActivator () {
        return !!this.$slots.activator || !!this.$scopedSlots.activator
      },
    },
    watch: {
      value () {
        this.filters = getNormalizedValues(this.value)
      },
      categoriesList () {
        this.$emit('categories', this.categoriesById)
      },
    },
    mounted () {
      this.getProductCategoriesHeirarchy(this.filterFunction).then(categories => {
        this.categories = categories
      })
    },
    methods: {
      resetFilters () {
        this.filters = {}
      },
      onHierarchyChanged (h) {
        if (this.returnObject) {
          this.$emit('input', Object.keys(h).filter(k => h[k]).map(k => this.categoriesById[k] ?? false))
        } else {
          this.$emit('input', h)
        }
      },
    },
  }
</script>
