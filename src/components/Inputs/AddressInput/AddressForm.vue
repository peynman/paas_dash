<template>
  <v-card
    :dark="dark"
    :light="light"
    :color="color"
  >
    <v-card-title>
      {{ $t('components.admin.addressesInput.addTitle') }}
      <v-spacer />
      <v-btn v-if="showClose" icon @click="$emit('close')"><v-icon>mdi-close</v-icon></v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <validations-alert :type="formAlertType" :errors="formAlertErrorList" :message="formAlertMessage" />
        <v-autocomplete
          v-model="province_code"
          :label="$t('components.admin.addressesInput.state')"
          :rules="[ getRequiredOrZeroRule() ]"
          :items="provinces"
          :error-messages="getPropertyErrorMessages('province_code')"
        />
        <v-autocomplete
          v-model="city_code"
          :label="$t('components.admin.addressesInput.city')"
          :rules="[ getRequiredOrZeroRule() ]"
          :items="cities"
          :error-messages="getPropertyErrorMessages('city_code')"
        />
        <v-text-field
          v-model="address"
          :label="$t('components.admin.addressesInput.address')"
          :hint="$t('components.admin.addressesInput.addressHint')"
          :error-messages="getPropertyErrorMessages('address')"
          :rules="[ getRequiredRule() ]"
        />
        <v-text-field
          v-model="postal_code"
          :label="$t('components.admin.addressesInput.postalCode')"
          :error-messages="getPropertyErrorMessages('postal_code')"
          :rules="[getRequiredRule(), getMinLengthRule(10), getMaxLengthRule(10)]"
        />
        <location-input
          ref="mapInput"
          v-model="location"
          :label="$t('components.admin.addressesInput.location')"
          :error-messages="getPropertyErrorMessages('location')"
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn class="success" :loading="loading" @click="addAddress">
        {{ $t('components.admin.addressesInput.add') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import FormValidations from '../../../mixins/FormValidations'
  import Themeable from '../../../mixins/Themeable'
  import LocationInput from '../LocationInput/LocationInput.vue'
  import Iran from '../../../mixins/Iran'
  import ValidationsAlert from '../ValidationsAlert/ValidationsAlert.vue'
  import { toEnglishDigits } from '../../../utils/helpers'

  export default {
    name: 'AddressForm',
    components: {
      LocationInput,
      ValidationsAlert,
    },
    mixins: [
      FormValidations([
        'city_code',
        'province_code',
        'postal_code',
        'address',
        'location',
      ]),
      Themeable,
      Iran,
    ],
    props: {
      value: Object,
      showClose: Boolean,
      loading: Boolean,
      dark: Boolean,
      color: String,
      light: Boolean,
    },
    data: vm => ({
      valid: true,
      city_code: vm.value?.city_code,
      province_code: vm.value?.province_code,
      address: vm.value?.address,
      postal_code: vm.value?.postal_code,
      location: vm.value?.location,
    }),
    computed: {
      province () {
        return this.provinces[this.province_code]
      },
    },
    watch: {
      value () {
        this.city_code = this.value.city_code
        this.province_code = this.value.province_code
        this.postal_code = this.value.postal_code
        this.location = this.value.location
        this.address = this.value.address
      },
    },
    methods: {
      resetForm () {
        this.city_code = null
        this.province_code = null
        this.postal_code = null
        this.location = null
        this.address = null
        this.resetFormValidations()
      },
      resetMap () {
        this.$refs.mapInput.resetMap()
        this.resetFormValidations()
      },
      addAddress () {
        this.$refs.form.validate()

        if (this.valid) {
          this.$emit('input', {
            country_code: 1,
            city_code: this.city_code,
            province_code: this.province_code,
            postal_code: toEnglishDigits(this.postal_code),
            location: { ...this.location },
            address: this.address,
          })
        }
      },
    },
  }
</script>
