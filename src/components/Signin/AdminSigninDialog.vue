<template>
  <v-dialog :value="showSigninDialog" max-width="760px" @input="onDialog">
    <template v-slot:activator="{on}">
      <slot name="activator" :on="on" />
    </template>
    <v-card>
      <admin-signin-form />
    </v-card>
  </v-dialog>
</template>

<script>
  import AdminSigninForm from './AdminSigninForm.vue'

  export default {
    name: 'AdminSigninDialog',
    components: {
      AdminSigninForm,
    },
    computed: {
      showSigninDialog () {
        return this.$store.getters.shouldOpenSigninDialog
      },
    },
    methods: {
      onDialog (dialog) {
        if (!dialog) {
          this.$store.commit('closeSigninDialog')
        }
      },
    },
  }
</script>
