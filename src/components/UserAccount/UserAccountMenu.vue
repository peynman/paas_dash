<template>
  <v-menu offset-y :dark="dark" :light="light">
    <template v-slot:activator="{on}">
      <slot name="activator" :on="on" />
    </template>
    <v-list dense :color="color">
      <v-list-item
        v-for="link in menuItems"
        :key="link.id"
        :href="link.href"
        :to="link.to"
        @click="onLinkClicked(link)"
      >
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  import UserProfile from '../../mixins/UserProfile'
  import Menu from './menu'

  export default {
    name: 'UserAccount',
    mixins: [UserProfile],
    props: {
      color: String,
      light: Boolean,
      dark: Boolean,
    },
    computed: {
      menuItems () {
        return Menu(m => this.$t(m))
      },
    },
    methods: {
      onLinkClicked (link) {
        if (typeof link.click === 'function') {
          link.click.bind(this)()
        }
      },
    },
  }
</script>
