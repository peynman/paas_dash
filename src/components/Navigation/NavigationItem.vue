<template>
  <v-divider v-if="link.divider" />
  <div v-else-if="isVisibleToUser">
    <v-list-group v-if="link.children && link.children.length > 0" :sub-group="false">
      <template v-slot:activator>
        <navigation-link :link="link" :depth="depth" />
      </template>
      <navigation-item v-for="sublink in link.children" :key="sublink.id" :link="sublink" :depth="depth + 1" />
    </v-list-group>
    <navigation-link v-else :link="link" :depth="depth + 1" />
  </div>
</template>

<script>
import NavigationLink from './NavigationLink.vue'
import User from '../../mixins/User'

export default {
  name: 'NavigationItem',
  components: {
    NavigationLink,
  },
  mixins: [
    User,
  ],
  props: {
    link: {
      type: Object,
      default: () => ({}),
    },
    subGroup: Boolean,
    depth: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    isVisibleToUser() {
      const permissions = this.link?.children?.filter(c => c.permission) ?? []
      return true; // permissions.length === 0 || permissions.map(c => c.permission).filter(c => this.authUserHasPermission(c))?.length > 0
    },
  },
}
</script>
