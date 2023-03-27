<template>
  <centered color="#f7f7f7">
    <div class="d-flex flex-column align-center justify-center">
      <v-img :src="theme.admin.signin.logo" width="105px" class="mb-3" />
      <div class="fill-width d-flex flex-row flex-grow-1 justify-center align-center">
        <v-col cols="12" sm="8">
          <v-card elevation="2" shaped>
            <admin-signin-form @success="onLoginSuccess" />
          </v-card>
        </v-col>
      </div>
    </div>
  </centered>
</template>

<script>
  import Themeable from '@peynman/press-vue-core/mixins/Themeable'
  import Centered from '../templates/Centered/Centered.vue'
  import AdminSigninForm from '../components/Signin/AdminSigninForm.vue'

  export default {
    name: 'AdminSignin',
    components: {
      Centered,
      AdminSigninForm,
    },
    mixins: [
      Themeable,
    ],
    methods: {
      onLoginSuccess () {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const returnTo = urlParams.get('return')
        if (returnTo) {
          this.$router.replace(returnTo)
        } else {
          this.$router.replace('/admin')
        }
      },
    },
  }
</script>
