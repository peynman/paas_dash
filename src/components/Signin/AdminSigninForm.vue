<template>
  <div class="d-flex flex-column">
    <v-card-title>{{ $t('components.admin.signin.title') }}</v-card-title>
    <v-divider />
    <v-card-text>
      <validations-alert :type="formAlertType" :errors="formAlertErrorList" :message="formAlertMessage" />
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="server"
          :label="$t('components.admin.signin.server')"
          :hint="$t('components.admin.signin.serverHint')"
          :rules="[getRequiredRule(), getMinLengthRule(4)]"
          v-bind="theme.admin.input"
          v-if="customServer"
        >
          <template v-slot:append>
            <v-btn icon @click="onCheckServer">
              <v-icon small>mdi-check</v-icon>
            </v-btn>
          </template>
        </v-text-field>
        <v-text-field
          v-if="serverOk"
          v-model="username"
          :label="$t('components.admin.signin.username')"
          :hint="$t('components.admin.signin.usernameHint')"
          :rules="[getRequiredRule(), getUsernameRule()]"
          v-bind="theme.admin.input"
        />
        <v-text-field
          v-if="serverOk"
          v-model="password"
          :label="$t('components.admin.signin.password')"
          type="password"
          :rules="[getRequiredRule(), getMinLengthRule(6)]"
          v-bind="theme.admin.input"
        />
        <captcha-input
          v-if="serverOk"
          v-model="captcha"
          :rules="[getRequiredRule()]"
          @submit="onSubmit"
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions class="d-flex flex-row justify-end align-center">
      <v-btn
        color="success"
        dark
        :loading="loading"
        @click="onSubmit"
      >{{ $t('components.admin.signin.submit') }}</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CaptchaInput from '../Inputs/CaptchaInput/CaptchaInput.vue'
  import ValidationsAlert from '../Inputs/ValidationsAlert/ValidationsAlert.vue'
  import FormValidations from '../../mixins/FormValidations'
  import Themeable from '../../mixins/Themeable'
  import { toEnglishDigits } from '../../utils/helpers'

  export default {
    name: 'AdminSigninForm',
    components: {
      CaptchaInput,
      ValidationsAlert,
    },
    mixins: [
      Themeable,
      FormValidations([
        'username',
        'password',
        'captcha',
      ])],
    props: {
      value: Object,
    },
    data: () => ({
      valid: false,
      loading: false,
      server: null,
      serverCheckVersion: null,
    }),
    computed: {
      canSubmit () {
        return !this.captchaLoading && this.valid
      },
      serverOk () {
        return !this.customServer || this.serverCheckVersion
      },
      customServer () {
        return [1, 'true', true, 'True'].indexOf(process.env.VUE_APP_API_BASE_CUSTOM) >= 0
      },
      ...mapGetters('captcha', [
        'captchaLoading',
        'captchaKey',
      ]),
    },

    methods: {
      onCheckServer () {
        
      },
      onSubmit () {
        this.$refs.form.validate()

        if (this.valid) {
          this.loading = true
          this.$store.dispatch('auth/signin', {
            username: toEnglishDigits(this.username),
            password: toEnglishDigits(this.password),
            captcha: toEnglishDigits(this.captcha),
            key: this.captchaKey,
          })
            .then(json => {
              this.updateFormSuccessMessage(json.message)
              setTimeout(() => { this.$emit('success') }, this.theme.signinDelay)
            })
            .catch(error => {
              this.updateFormValidationErrors(error)
            })
            .finally(() => {
              this.loading = false
            })
        }
      },
    },
  }
</script>
