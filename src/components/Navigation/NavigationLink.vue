<template>
  <v-list-item
    v-if="isVisibleToUser"
    :to="link.to"
    :href="link.href"
    @click="onLinkClicked(link)"
  >
    <v-list-item-icon class="my-auto">
      <v-icon>{{ link.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ link.title }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action v-if="link.actions">
      <v-list-item-action-text>
        <v-tooltip
          v-for="action in link.actions"
          :key="link.id + '_' + action.id"
          top
        >
          <template v-slot:activator="{on}">
            <v-btn
              v-if="!action.component"
              :href="action.href"
              :to="action.to"
              icon
              small
              :color="action.color"
              v-on="on"
            >
              <v-icon small>{{ action.icon }}</v-icon>
            </v-btn>
            <v-schema-renderer v-else
              :children="[action.component]"
            />
          </template>
          {{ action.title }}
        </v-tooltip>
      </v-list-item-action-text>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
  import User from '@peynman/press-vue-core/mixins/User'

  export default {
    name: 'NavigationLink',
    mixins: [
      User,
    ],
    props: {
      link: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      isVisibleToUser () {
        return !this.link?.permission || this.authUserHasPermission(this.link.permission)
      },
    },
    methods: {
      onLinkClicked (link) {
        if (link.click && typeof link.click === 'function') {
          link.click.bind(this)()
        }
      },
    },
  }
</script>
