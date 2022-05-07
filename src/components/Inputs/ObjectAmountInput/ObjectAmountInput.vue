<template>
  <v-tooltip top open-on-focus>
    <template v-slot:activator="{on}">
      <v-text-field
        v-model="amount"
        :label="label"
        :rules="rules"
        :disabled="disabled"
        :error-messages="errorMessages"
        type="number"
        @input="onValueChanged"
        v-on="on"
      >
        <template v-slot:append>
          <v-select
            v-model="currency"
            :disabled="disabled"
            :items="availableCurrencies"
            dense
            hide-details
            @input="onValueChanged"
          />
        </template>
      </v-text-field>
    </template>
    {{ amountString }}
  </v-tooltip>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ObjectAmountInput',
    props: {
      label: String,
      rules: Array,
      errorMessages: Array,
      disabled: Boolean,
      value: [Object, Number, String],
      amountKey: {
        type: String,
        default: 'amount',
      },
      currencyKey: {
        type: String,
        default: 'currency',
      },
      fallbackCurrency: {
        type: Number,
        default: 1,
      },
    },
    data: vm => ({
      amount: vm.value?.[vm.amountKey] ?? parseFloat(vm.value) ? parseFloat(vm.value) : 0,
      currency: vm.value?.[vm.currencyKey] ?? vm.fallbackCurrency,
    }),
    computed: {
      ...mapGetters('banking', [
        'availableCurrencies',
      ]),
      amountString () {
        if (this.amount) {
          return this.$t('components.admin.objectAmount.amount', {
            amount: this.$n(this.amount, 'decimal'),
            currency: this.$store.getters['banking/getCurrencyTitle'](this.currency),
          })
        }

        return this.$t('components.admin.objectAmount.free')
      },
    },
    methods: {
      onValueChanged () {
        this.$emit('input', {
          [this.amountKey]: this.amount,
          [this.currencyKey]: this.currency,
        })
      },
    },
  }
</script>
