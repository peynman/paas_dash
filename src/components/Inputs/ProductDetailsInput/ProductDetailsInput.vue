<template>
  <v-input
    :label="label"
    :rules="rules"
    :error-messages="errorMessages"
    :vertical="true"
    :disabled="disabled"
    :loading="isProductTypesLoading"
  >
    <v-progress-linear
      v-if="isProductTypesLoading"
      indeterminate
      class="mt-1"
    />
    <v-tabs
      v-model="tab"
      centered
    >
      <v-tabs-slider />
      <v-tab v-for="(type, index) in cachedTypes" :key="`product-types-tab-${index}`">
        <v-simple-checkbox
          :value="internalValue[type.name] !== undefined"
          @input="onToggleProductType(type)"
        />
        <v-icon v-if="type.data.icon">{{ type.data.icon }}</v-icon>
        <span>{{ type.data.title }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="fill-width">
      <v-tab-item v-for="(type, index) in cachedTypes" :key="`product-types-item-${index}`" :disabled="!internalValue[type.name]">
        <v-schema-renderer
          v-if="internalValue[type.name]"
          :components-dictionary="widgetsDictionary"
          :pre-processor="preProcessWidget"
          :children="type.data.content.children"
          :value="internalValue[type.name]"
          @input="onTypeUpdated($event, type)"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-input>
</template>

<script>
  import { mapGetters } from 'vuex'
  import WidgetsRenderer from '../../../mixins/WidgetsRenderer'
  import FormValidations from '../../../mixins/FormValidations'

  export default {
    name: 'ProductDetailsInput',
    mixins: [
      WidgetsRenderer,
      FormValidations(),
    ],
    props: {
      label: String,
      errorMessages: Array,
      rules: Array,
      value: Object,
      disabled: Boolean,
      types: Array,
    },
    data: vm => ({
      cachedTypes: vm.types ?? [],
      tab: 0,
      internalValue: vm.value ?? {},
    }),
    computed: {
      ...mapGetters('repos', [
        'isProductTypesLoading',
      ]),
      activeTypeIds () {
        return this.cachedTypes?.filter(t => Object.keys(this.internalValue)
          .includes(t.name) && this.internalValue[t.name]).map(t => t.id) ?? []
      },
    },
    watch: {
      value () {
        this.internalValue = this.value ?? {}
      },
    },
    mounted () {
      this.fetchProductTypes()
    },
    methods: {
      onTypeUpdated (values, type) {
        this.$set(this.internalValue, type.name, values)
        this.$set(this.internalValue, 'types', this.activeTypeIds)
        this.$emit('input', this.internalValue)
      },
      fetchProductTypes () {
        if (!this.cachedTypes || this.cachedTypes.length === 0) {
          this.$store.dispatch('repos/fetchProductTypes').then(types => {
            this.cachedTypes = types
          })
        }
      },
      onToggleProductType (type) {
        if (this.internalValue[type.name]) {
          this.$set(this.internalValue, type.name, undefined)
          this.$set(this.internalValue, 'types', this.activeTypeIds)
          this.$emit('input', this.internalValue)
        } else {
          this.$set(this.internalValue, type.name, {})
          this.$set(this.internalValue, 'types', this.activeTypeIds)
          this.$emit('input', this.internalValue)
        }
      },
    },
  }
</script>
