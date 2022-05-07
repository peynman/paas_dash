<template>
  <v-input :label="label" :disabled="disabled" :vertical="true">
    <v-row no-gutters class="fill-width">
      <v-col cols="6" sm="4">
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-text-field
              v-model="internalValue.amount"
              :label="$t('components.admin.crud.labels.amount')"
              type="number"
              hide-details
              clearable
              v-on="on"
            />
          </template>
          <span>{{ $n(internalValue.amount, 'decimal') }}</span>
        </v-tooltip>
      </v-col>
      <v-col cols="6" sm="4">
        <v-select
          v-model="internalValue.currency"
          :label="$t('components.admin.crud.labels.currency')"
          :items="availableCurrencies"
          hide-details
        />
      </v-col>
      <v-col cols="6" sm="4">
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-text-field
              v-model="internalValue.offAmount"
              :label="$t('components.admin.crud.labels.offAmount')"
              type="number"
              hide-details
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
    name: 'ProductFixedPriceInput',
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
