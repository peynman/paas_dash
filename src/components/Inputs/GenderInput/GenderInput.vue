<template>
  <v-input
    :dark="dark"
    :light="light"
    :value="internalValue !== undefined && internalValue !== null"
    vertical
    :rules="rules"
    :error-messages="errorMessages"
    :label="label"
  >
    <v-btn-toggle v-model="internalValue" dense class="mt-1" @change="onUpdate">
      <v-btn>{{ $t('components.admin.genderInput.genderMale') }}</v-btn>
      <v-btn>{{ $t('components.admin.genderInput.genderFemale') }}</v-btn>
    </v-btn-toggle>
  </v-input>
</template>

<script>
  export default {
    name: 'GenderInput',
    props: {
      label: String,
      dark: Boolean,
      light: Boolean,
      rules: Array,
      errorMessages: Array,
      mandatory: Boolean,
      value: [String, Number],
    },
    data: vm => ({
      internalValue: vm.value,
    }),
    watch: {
      value () {
        this.internalValue = this.value
      },
    },
    methods: {
      onUpdate (v) {
        this.$emit('input', this.internalValue)
      },
    },
  }
</script>
