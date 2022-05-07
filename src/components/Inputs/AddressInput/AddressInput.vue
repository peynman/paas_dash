<template>
  <v-input
    :label="label"
    :value="value"
    :error-messages="errorMessages"
    :rules="rules"
    :disabled="disabled"
    vertical
  >
    <template v-slot:prepend>
      <v-dialog :retain-focus="false" max-width="766">
        <template v-slot:activator="{on}">
          <v-btn color="success" icon v-on="on"><v-icon>mdi-plus-box</v-icon></v-btn>
        </template>
        <address-form @input="onAddAddress" />
      </v-dialog>
    </template>
    <v-list dense two-line>
      <div v-for="(address, i) in internalValue" :key="`address-${i}`" class="d-flex flex-column">
        <address-display
          :value="address"
          @remove="onRemoveAddress"
          @update="onUpdateAddress($event, address)"
        />
        <v-divider />
      </div>
    </v-list>
  </v-input>
</template>

<script>
  import AddressDisplay from './AddressDisplay.vue'
  import AddressForm from './AddressForm.vue'

  export default {
    name: 'AddressInput',
    components: {
      AddressForm,
      AddressDisplay,
    },
    props: {
      label: String,
      rules: Array,
      disabled: Boolean,
      errorMessages: Array,
      value: Array,
      default: () => ([]),
    },
    data: vm => ({
      internalValue: vm.value ?? [],
    }),
    watch: {
      value () {
        this.internalValue = this.value ?? []
      },
      internalValue: {
        deep: true,
        handler () {
          this.$emit('input', this.internalValue)
        },
      },
    },
    methods: {
      onAddAddress (address) {
        this.internalValue.push(address)
      },
      onUpdateAddress (n, o) {
        const index = this.internalValue.indexOf(o)
        console.log(index, n, o)
        if (index >= 0) {
          this.$set(this.internalValue, index, n)
        }
      },
      onRemoveAddress (address) {
        const index = this.internalValue.indexOf(address)
        console.log(index, address)
        if (index >= 0) {
          this.internalValue.splice(index, 1)
        }
      },
    },
  }
</script>
