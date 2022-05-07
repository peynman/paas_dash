<template>
  <v-navigation-drawer
    v-model="internalValue"
    app
    right
    width="300px"
    :color="theme.admin.navigation.color"
    :dark="theme.admin.navigation.dark"
    :light="theme.admin.navigation.light"
  >
    <v-list dense>
      <user-account-detailed
        :color="theme.admin.navigation.menu.color"
        :dark="theme.admin.navigation.menu.dark"
        :light="theme.admin.navigation.menu.light"
      />
      <v-divider />
      <navigation-item v-for="link in links" :key="link.id" :link="link" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import MenuItems from './menu'
  import NavigationItem from './NavigationItem.vue'
  import UserAccountDetailed from '../UserAccount/UserAccountDetailed.vue'
  import Themeable from '@peynman/press-vue-core/mixins/Themeable'

  export default {
    name: 'AdminNavigation',
    components: { NavigationItem, UserAccountDetailed },
    mixins: [Themeable],
    props: {
      value: Boolean,
    },
    data: vm => ({
      internalValue: vm.value,
    }),
    computed: {
      links () {
        return MenuItems(m => this.$t(m)).sort((m1, m2) => m1.order - m2.order)
      },
    },
    watch: {
      value (n) {
        this.internalValue = n
      },
      internalValue (n) {
        this.$emit('input', n)
      },
    },
  }
</script>
