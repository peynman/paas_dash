<template>
  <v-card>
    <v-card-title>{{ $t('components.admin.domainPicker.addTitle') }}</v-card-title>
    <v-divider />
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-select
          v-model="domain"
          :label="$t('components.admin.domainPicker.domain')"
          :items="domains"
          :rules="[getRequiredRule()]"
          :loading="loading"
          return-object
        />
        <bitwise-flags-input
          v-model="flags"
          :items="flagItems"
          :rules="[getRequiredRule()]"
          :label="$t('components.admin.domainPicker.flagsLabel')"
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn color="success" @click="addDomain">{{ $t('components.admin.domainPicker.add') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import BitwiseFlagsInput from '../BitwiseFlagsInput/BitwiseFlagsInput.vue'
  import FormValidations from '@peynman/press-vue-core/mixins/FormValidations'

  export default {
    name: 'EditCard',
    components: {
      BitwiseFlagsInput,
    },
    mixins: [FormValidations()],
    props: {
      value: Object,
      domains: Array,
      flagItems: Array,
      loading: Boolean,
    },
    data: vm => ({
      domain: vm.value?.domain,
      flags: vm.value?.pivot?.flags,
      valid: true,
    }),
    methods: {
      addDomain () {
        this.$refs.form.validate()

        if (this.valid) {
          this.$emit('input', {
            id: this.domain.value,
            domain: this.domain.text,
            pivot: {
              flags: this.flags,
            },
          })
        }
      },
    },
  }
</script>
