<template>
  <v-input
    :label="label"
    :dark="dark"
    :ligth="light"
    :loading="isBankGatewaysLoading"
    :value="internalValue !== undefined && internalValue !== null"
    :rules="rules"
    :error-messages="errorMessages"
    :vertical="true"
  >
    <v-progress-linear v-if="isBankGatewaysLoading" indeterminate />
    <v-btn-toggle
      :value="internalValue"
      dense
      class="mt-1"
      active-class="v-item--active primary"
      dark
      :disabled="disabled"
      @change="onUpdateSelection"
    >
      <v-btn v-for="bank in bankGateways" :key="`bank-gateway-${bank.id}`" text :disabled="disabled">
        {{ bank.title }}
      </v-btn>
    </v-btn-toggle>
  </v-input>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'BankGatewayPicker',
    props: {
      label: String,
      dark: Boolean,
      light: Boolean,
      rules: Array,
      errorMessages: Array,
      disabled: Boolean,
      value: [Object, String, Number],
    },
    data: vm => ({
      internalValue: vm.value ?? 0,
    }),
    computed: {
      ...mapGetters('banking', [
        'bankGateways',
        'isBankGatewaysLoading',
      ]),
    },
    mounted () {
      this.fetchBankGateways()
    },
    methods: {
      ...mapActions('banking', [
        'fetchBankGateways',
      ]),

      onUpdateSelection (v) {
        this.internalValue = v
        this.$emit('input', this.internalValue)
      },
    },
  }
</script>
