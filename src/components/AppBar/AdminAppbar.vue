<template>
  <v-app-bar
    :app="viewMode ? false:true"
    :color="theme.admin.appbar.color"
    :dark="theme.admin.appbar.dark"
    :light="theme.admin.appbar.light"
  >
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
    <v-btn icon @click="searchMode = !searchMode">
      <v-icon>{{ searchMode ? 'mdi-close' : 'mdi-magnify' }}</v-icon>
    </v-btn>
    <v-text-field v-if="searchMode" v-model="searchTerm" hide-details />
    <v-app-bar-title v-if="!searchMode">{{ $t('pages.admin.title') }}</v-app-bar-title>
    <v-spacer v-if="!searchMode" />
    <notifications-menu v-if="!searchMode" />
    <admin-signin-dialog v-if="!isLoggedIn">
      <template v-slot:activator="{on}">
        <v-btn
          class="mx-1"
          v-on="on"
        >{{ $t('components.admin.appbar.signin') }}</v-btn>
      </template>
    </admin-signin-dialog>
    <user-account-menu
      v-else-if="!searchMode"
      :color="theme.admin.navigation.menu.color"
      :light="theme.admin.navigation.menu.light"
      :dark="theme.admin.navigation.menu.dark"
    >
      <template v-slot:activator="{on}">
        <user-account-bar-icon
          :color="theme.admin.appbar.color"
          :light="theme.admin.appbar.light"
          :dark="theme.admin.appbar.dark"
          @click="on.click"
        />
      </template>
    </user-account-menu>
    <language-menu v-if="!searchMode" />
  </v-app-bar>
</template>

<script>
  import Themeable from '@peynman/press-vue-core/mixins/Themeable'
  import UserProfile from '@peynman/press-vue-core/mixins/UserProfile'
  import UserAccountMenu from '../UserAccount/UserAccountMenu.vue'
  import NotificationsMenu from './NotificationsMenu.vue'
  import LanguageMenu from './LanguageMenu.vue'
  import UserAccountBarIcon from './UserAccountBarIcon.vue'
  import AdminSigninDialog from '../Signin/AdminSigninDialog.vue'

  export default {
    name: 'AdminAppbar',
    components: {
      UserAccountMenu,
      NotificationsMenu,
      LanguageMenu,
      UserAccountBarIcon,
      AdminSigninDialog,
    },
    mixins: [Themeable, UserProfile],
    props: {
      viewMode: Boolean,
    },
    data: () => ({
      searchMode: false,
      searchTerm: '',
      loading: false,
    }),
  }
</script>
