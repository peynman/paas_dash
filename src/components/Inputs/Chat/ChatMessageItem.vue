<template>
  <v-list-item three-line :dark="dark" :light="light">
    <v-list-item-content>
      <blockquote
        :class="`speech-bubble ${value.author_id === authUserId ? 'right' : 'left'}`"
        :style="bubbleStyles"
      >
        <p>
          <pre>{{ value.message }}</pre>
        </p>
        <cite :class="`d-flex flex-row align-center justify-center ${value.author_id === authUserId ? 'right' : 'left'}`">
          <v-avatar>
            <v-img :src="getUserProfilePic(value.author)" />
          </v-avatar>
          <div class="d-flex flex-column ms-2">
            <v-chip label small>
              {{ getFullname(value.author) }}
            </v-chip>
            <v-chip label x-small class="mt-2">
              {{ getRelativeTimestamp(value.created_at) }}
            </v-chip>
          </div>
        </cite>
      </blockquote>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  import UserProfileMethods from '../../../mixins/UserProfileMethods'
  import TimestampFormatter from '../../../mixins/TimestampFormatter'
  import User from '../../../mixins/User'

  export default {
    name: 'ChatMessageItem',
    mixins: [
      UserProfileMethods,
      TimestampFormatter,
      User,
    ],
    props: {
      value: Object,
      color: String,
      dark: Boolean,
      light: Boolean,
    },
    computed: {
      bubbleStyles () {
        return Object.entries({
          'background-color': this.color ?? 'black',
          'border-color': this.color ?? 'black',
        }).reduce((str, entry) => {
          return `${str} ${entry[0]}: ${entry[1]};`
        }, '')
      },
    },
  }
</script>
