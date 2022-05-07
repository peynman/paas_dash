<template>
  <span class="caption">
    {{ amount }}
  </span>
</template>

<script>
  export default {
    name: 'CurrencyColumn',
    props: {
      value: [Number, String],
    },
    computed: {
      amount () {
        if (this.value) {
          return this.$t('components.admin.currencyColumn.amount', {
            amount: this.$n(this.value, 'decimal'),
            currency: this.$store.getters['banking/currentCurrencyTitle'],
          })
        }

        return this.$t('components.admin.currencyColumn.free')
      },
    },
  }
</script>
