<template>
  <v-card>
    <v-card-title>{{ $t('components.admin.phoneNumber.addTitle') }}</v-card-title>
    <v-divider />
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="phone"
          :label="$t('components.admin.phoneNumber.phone')"
          :hint="$t('components.admin.phoneNumber.phoneHint')"
          :rules="[ getRequiredRule(), getPhoneNumberRule() ]"
        />
        <bitwise-flags-input
          v-model="flags"
          :items="itemFlags"
          :label="$t('components.admin.phoneNumber.flagsLabel')"
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn class="success" @click="addPhone">{{ $t('components.admin.phoneNumber.add') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import BitwiseFlagsInput from '../BitwiseFlagsInput/BitwiseFlagsInput.vue'
  import FormValidations from '../../../mixins/FormValidations'

  export default {
    name: 'EditCard',
    components: {
      BitwiseFlagsInput,
    },
    mixins: [FormValidations()],
    props: {
      itemFlags: Array,
      value: Object,
    },
    data: vm => ({
      valid: true,
      phone: vm.value?.number,
      flags: vm.value?.flags ?? 0,
    }),
    watch: {
      value (n) {
        this.phone = this.value.number
        this.flags = this.value.flags
      },
    },
    methods: {
      addPhone () {
        this.$refs.form.validate()

        if (this.valid) {
          this.$emit('input', {
            number: this.phone,
            flags: this.flags,
          })
          this.phone = null
          this.flags = 0
        }
      },
    },
  }
</script>
