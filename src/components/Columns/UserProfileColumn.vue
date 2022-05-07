<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img v-if="userProfilePic" :src="userProfilePic" />
      <v-icon v-else>mdi-account</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ firstname }} {{ lastname }}</v-list-item-title>
      <v-list-item-subtitle>
        <v-chip label dense x-small>
          {{ `#${userId}` }}
          <span class="caption">{{ userName }}</span>
        </v-chip>
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <v-chip label dense x-small>
          {{ userHighRole }}
        </v-chip>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  import UserProfile from '@peynman/press-vue-core/mixins/UserProfile'

  export default {
    name: 'UserProfileColumn',
    mixins: [UserProfile],
    props: {
      user: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      targetUser () {
        return this.user
      },
    },
  }
</script>
