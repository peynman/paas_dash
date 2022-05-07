<template>
  <v-form ref="form" v-model="valid">
    <v-textarea
      v-model="message"
      :label="$t('components.website.chat.messageLabel')"
      :rules="[ getRequiredRule() ]"
    />
    <v-divider />
    <v-card-actions>
      <v-btn
        color="success"
        :loading="loading"
        @click="onSubmit"
      >{{ $t('components.website.chat.submit') }}</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
  import FormValidations from '@peynman/press-vue-core/mixins/FormValidations'

  export default {
    name: 'ChatMessageForm',
    mixins: [
      FormValidations(),
    ],
    props: {
      roomId: Number,
    },
    data: vm => ({
      loading: false,
      valid: false,
      message: null,
    }),
    methods: {
      onSubmit () {
        this.$refs.form.validate()

        if (this.valid) {
          this.loading = true
          this.$store.dispatch('chat/sendMessage', {
            roomId: this.roomId,
            message: this.message,
          })
            .then(json => {
              this.$emit('sent-message', json.msg)
              this.message = null
              this.$refs.form.resetValidation()
              this.$store.commit('snackbar/addMessage', {
                message: json.message,
                color: 'success',
              })
            })
            .catch(err => {
              this.$store.commit('snackbar/addMessage', {
                message: err.message,
                color: 'red',
              })
            })
            .finally(() => {
              this.loading = false
            })
        }
      },
    },
  }
</script>
