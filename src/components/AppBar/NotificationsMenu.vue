<template>
  <v-menu v-if="hasNotifications" offset-y left>
    <template v-slot:activator="{on}">
      <v-badge
        overlap
        left
        color="warning"
        :content="$n(unseenNotificationsCount, 'decimal')"
      >
        <v-btn icon v-on="on">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>
    </template>
    <v-sheet>
      <v-list>
        <div v-for="n in unseenNotifications" :key="n.id">
          <v-list-item :href="n.data.href">
            <v-list-item-icon v-if="n.data.icon">
              <v-icon>{{ n.data.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ n.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ n.message }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
        </div>
      </v-list>
      <div class="d-flex flex-grow-1 justify-center align-center ma-2">
        <v-btn block outlined>{{ $t('components.admin.appbar.showAllNotifications') }}</v-btn>
      </div>
    </v-sheet>
  </v-menu>
</template>

<script>
  import UserNotifications from '@peynman/press-vue-core/mixins/UserNotifications'

  export default {
    name: 'NotificationsMenu',
    mixins: [UserNotifications],
    props: {
      notifications: {
        type: Array,
        default: () => ([]),
      },
    },
  }
</script>
