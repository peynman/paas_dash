<template>
  <v-divider v-if="link.divider" />
  <div v-else-if="isVisibleToUser">
    <v-list-group v-if="link.children && link.children.length > 0" :sub-group="subGroup">
      <template v-slot:activator>
        <navigation-link :link="link" class="px-0" />
      </template>
      <navigation-item v-for="sublink in link.children" :key="sublink.id" :link="sublink" sub-group />
    </v-list-group>
    <navigation-link v-else :link="link" />
  </div>
</template>

<script>
  import NavigationLink from './NavigationLink.vue'
  import User from '@peynman/press-vue-core/mixins/User'

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
    },
    computed: {
      isVisibleToUser () {
        const permissions = this.link?.children?.filter(c => c.permission) ?? []
        return permissions.length === 0 || permissions.map(c => c.permission).filter(c => this.authUserHasPermission(c))?.length > 0
      },
    },
  }
</script>
