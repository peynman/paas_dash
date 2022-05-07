<template>
  <v-input
    :label="label"
    :disabled="disabled"
    :vertical="true"
    :rules="rules"
    :error-messages="errorMessages"
    :value="internalValue"
  >
    <div class="d-flex flex-column justify-start align-start flex-grow-1">
      <product-categories-filter-input
        :title="$t('components.admin.productCategories.choose')"
        return-object
        :value="internalValue"
        @input="onCategoriesChanged"
        @categories="onCategoriesFetched"
      >
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-btn text @click="onSelectAll">{{ $t('components.admin.productCategories.selectAll') }}</v-btn>
            <v-btn text @click="onSelectNone">{{ $t('components.admin.productCategories.selectNone') }}</v-btn>
          </v-list-item-content>
        </v-list-item>
      </product-categories-filter-input>
      <div class="d-flex flex-row">
        <div
          v-for="(cat, index) in activeCategories"
          :key="`category-selected-${index}`"
        >
          <v-chip
            v-if="cat && cat.data"
            label
            dense
            small
            class="mx-1"
            :color="cat.data.backColor"
          >
            <v-icon v-if="cat.data.icon" :color="cat.data.textColor" class="me-1">{{ cat.data.icon }}</v-icon>
            <span :style="`color: ${cat.data.textColor}`">{{ cat.data.title }}</span>
          </v-chip>
        </div>
      </div>
    </div>
  </v-input>
</template>

<script>
  import ProductCategoriesFilterInput from './ProductCategoriesFilterInput.vue'

  export default {
    name: 'ProductCategoriesInput',
    components: {
      ProductCategoriesFilterInput,
    },
    props: {
      label: String,
      disabled: Boolean,
      rules: Array,
      errorMessages: Array,
      value: Array,
      returnIds: Boolean,
    },
    data: vm => ({
      categoriesDic: {},
      lazyValue: vm.value,
    }),
    computed: {
      activeCategories () {
        return this.getCategoriesObjects(this.internalValue)
      },
      internalValue: {
        get () {
          return this.getCategoriesObjects(this.value)
        },
        set (x) {
          this.lazyValue = x
        },
      },
    },
    methods: {
      onSelectNone () {

      },
      onSelectAll () {

      },
      onCategoriesChanged (c) {
        if (this.returnIds) {
          this.$emit('input', [...c.map(c => c.id)])
        } else {
          this.$emit('input', [...c])
        }
      },
      onCategoriesFetched (cats) {
        this.categoriesDic = cats
      },
      getCategoriesObjects (cats) {
        return cats?.reduce((cats, c) => {
          if (c?.id) {
            cats.push(c)
          } else if (this.categoriesDic[c]) {
            cats.push(this.categoriesDic[c])
          }
          return cats
        }, []) ?? []
      },
    },
  }
</script>
