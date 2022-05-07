<template>
  <v-input :label="label" :disabled="disabled" :vertical="true">
    <v-row no-gutters class="fill-width">
      <v-col cols="8" sm="4">
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-text-field
              v-model="internalValue.amount"
              :label="$t('components.admin.crud.labels.amount')"
              hide-details
              type="number"
              clearable
              v-on="on"
            />
          </template>
          <span>{{ $n(internalValue.amount, 'decimal') }}</span>
        </v-tooltip>
      </v-col>
      <v-col cols="4" sm="4">
        <v-select
          v-model="internalValue.currency"
          :label="$t('components.admin.crud.labels.currency')"
          hide-details
          :items="availableCurrencies"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-text-field
              v-model="internalValue.offAmount"
              :label="$t('components.admin.crud.labels.offAmount')"
              hide-details
              type="number"
              clearable
              v-on="on"
            />
          </template>
          <span>{{ $n(internalValue.offAmount, 'decimal') }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-input>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ProductPeriodicPriceInput',
    props: {
      label: String,
      disabled: Boolean,
      rules: Array,
      errorMessages: Array,
      value: Object,
    },
    data: vm => ({
      internalValue: vm.value ?? {},
    }),
    computed: {
      ...mapGetters('banking', [
        'availableCurrencies',
      ]),
    },
    watch: {
      value () {
        this.internalValue = this.value ?? {}
      },
      internalValue: {
        deep: true,
        handler () {
          this.$emit('input', this.internalValue)
        },
      },
    },
  }
</script>
