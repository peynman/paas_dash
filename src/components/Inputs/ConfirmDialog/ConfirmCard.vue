<template>
  <v-card :dark="dark" :light="light" :color="color">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-actions>
      <v-btn :color="secondaryColor" @click="$emit('cancel')">{{ cancelString }}</v-btn>
      <v-btn :color="primaryColor" @click="$emit('success')">{{ okString }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'ConfirmCard',
    props: {
      title: String,
      dark: Boolean,
      light: Boolean,
      ok: String,
      color: String,
      cancel: String,
      okColor: String,
      cancelColor: String,
    },
    computed: {
      okString () {
        return this.ok || this.$t('components.admin.confirmDialog.ok')
      },
      cancelString () {
        return this.cancel || this.$t('components.admin.confirmDialog.cancel')
      },
      primaryColor () {
        return this.okColor || 'success'
      },
      secondaryColor () {
        return this.cancelColor || 'secondary'
      },
    },
  }
</script>
