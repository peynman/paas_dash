<template>
  <div>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="3" class="ma-0 pa-0">
        <v-img contain :src="captchaImage" />
      </v-col>
      <v-col cols="9" class="ma-0 pa-0">
        <v-text-field
          :value="value"
          :label="$t('components.admin.captchaInput.label')"
          :hint="$t('components.admin.captchaInput.hint')"
          persistent-hint
          :rules="rules"
          :error-messages="errorMessages"
          :disabled="disabled"
          v-bind="textFieldProps"
          @input="$emit('input', $event)"
          @keyup="onKeyUp"
        >
          <template v-slot:prepend>
            <v-btn :loading="captchaLoading" icon @click="fetchCaptcha"><v-icon>mdi-refresh</v-icon></v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Themeable from '../../../mixins/Themeable'

  export default {
    name: 'CaptchaInput',
    mixins: [Themeable],
    props: {
      value: String,
      rules: Array,
      errorMessages: Array,
      disabled: Boolean,
      inputTheme: Object,
    },
    computed: {
      textFieldProps () {
        return this.inputTheme || this.theme.admin.input
      },
      ...mapGetters('captcha', [
        'captchaKey',
        'captchaImage',
        'captchaLoading',
      ]),
    },

    mounted () {
      if (!this.captchaImage) {
        this.$store.dispatch('captcha/fetchCaptcha')
      }
    },

    methods: {
      ...mapActions('captcha', [
        'fetchCaptcha',
      ]),
      onKeyUp (e) {
        if (e.keyCode === 13) {
          this.$emit('submit')
        }
      },
    },
  }
</script>
