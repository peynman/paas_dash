<template>
  <user-account-menu :color="color" :dark="dark" :light="light">
    <template v-slot:activator="menuProps">
      <v-list-item three-line link v-on="menuProps.on">
        <v-list-item-avatar>
          <v-img :src="userProfilePic" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ userName }}</v-list-item-title>
          <v-list-item-subtitle v-if="contactEmail">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-small icon v-bind="attrs" v-on="on">
                  <v-icon x-small>mdi-email</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('components.admin.account.email') }}</span>
            </v-tooltip>
            <span>{{ contactEmail }}</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle v-if="contactPhone">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-small icon v-bind="attrs" v-on="on">
                  <v-icon x-small>mdi-phone</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('components.admin.account.phone') }}</span>
            </v-tooltip>
            <span>{{ contactPhone }}</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-small icon v-bind="attrs" v-on="on">
                  <v-icon x-small>mdi-account-cash</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('components.admin.account.balance') }}</span>
            </v-tooltip>
            <span>{{ $t('components.admin.account.yourBalance', { amount: userBalanceString }) }} {{ userBalanceCurrencyString }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>
  </user-account-menu>
</template>

<script>
  import UserAccountMenu from './UserAccountMenu.vue'
  import UserProfile from '@peynman/press-vue-core/mixins/UserProfile'

  export default {
    name: 'UserAccountDetailed',
    components: { UserAccountMenu },
    mixins: [UserProfile],
    props: {
      color: String,
      dark: Boolean,
      light: Boolean,
    },
  }
</script>
