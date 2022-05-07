<template>
  <v-input
    :label="label"
    :error-mesages="errorMessages"
    :rules="rules"
    :value="value"
    :disabled="disabled"
    :vertical="true"
  >
    <template v-slot:prepend>
      <v-dialog>
        <template v-slot:activator="{on}">
          <v-btn color="success" icon v-on="on"><v-icon>mdi-plus-box</v-icon></v-btn>
        </template>
        <edit-card @input="onAddNewCellarData" />
      </v-dialog>
    </template>
    <v-list dense two-line>
      <div v-for="(cellar, index) in internalValue" :key="`phone-${index}`" class="d-flex flex-column">
        <product-cellar-display
          :cellar="cellar"
          @update="onUpdateCellarData"
          @remove="onRemoveCellarData"
        />
        <v-divider />
      </div>
    </v-list>
  </v-input>
</template>

<script>
  import EditCard from './EditCard.vue'
  import ProductCellarDisplay from './ProductCellarDisplay.vue'

  export default {
    name: 'ProductCellarInput',
    components: {
      EditCard,
      ProductCellarDisplay,
    },
    props: {
      label: String,
      rules: Array,
      errorMessages: Array,
      value: [Array, Object],
      disabled: Boolean,
      default: () => ([]),
    },
    data: vm => ({
      internalValue: vm.value ?? [],
    }),
    watch: {
      value () {
        this.internalValue = this.value ?? []
      },
    },
    methods: {
      onAddNewCellarData (cellar) {
        this.internalValue.push(cellar)
        this.$emit('input', this.internalValue)
      },
      onUpdateCellarData (n, o) {
        const index = this.internalValue.indexOf(o)
        if (index >= 0) {
          this.$set(this.internalValue, index, n)
          this.$emit('input', this.internalValue)
        }
        this.editDialog = false
      },
      onRemoveCellarData (cellar) {
        const index = this.internalValue.indexOf(cellar)
        if (index >= 0) {
          this.internalValue.splice(index, 1)
          this.$emit('input', this.internalValue)
        }
      },
    },
  }
</script>
