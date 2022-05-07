<template>
  <v-menu
    v-model="menu"
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{}">
      <v-btn icon @click.stop="menu = !menu">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <navigation-item v-for="link in links" :key="link.id" :link="link" />
    </v-list>
  </v-menu>
</template>

<script>
  import Menu from './menu'
  import NavigationItem from './NavigationItem.vue'

  export default {
    name: 'AdminMenu',
    components: {
      NavigationItem,
    },
    data: () => ({
      menu: false,
    }),
    computed: {
      links () {
        return Menu(m => this.$t(m))
      },
    },
  }
</script>
