<template>
  <v-list
    dense
    class="pa-0"
    :color="color"
    :dark="dark"
    :light="light"
  >
    <v-list-item dense class="pa-0" width="100" @click="$emit('click', $event)">
      <v-list-item-avatar class="ma-0">
        <v-img v-if="userProfilePic" :src="userProfilePic" />
        <v-icon v-else>mdi-account</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <span v-if="hasProfile">
            {{ firstname }} {{ lastname }}
          </span>
          <span v-else>{{ $t('components.admin.appbar.fillProfile') }}</span>
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon>mdi-chevron-down</v-icon>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
  import UserProfile from '../../mixins/UserProfile'

  export default {
    name: 'UserAccountBarIcon',
    mixins: [UserProfile],
    props: {
      color: String,
      light: Boolean,
      dark: Boolean,
    },
  }
</script>
