<template>
  <v-dialog v-model="dialog" fullscreen>
    <template v-slot:activator="{on}">
      <v-btn small icon v-on="{ ...on, ...activator }"><v-icon small>mdi-chat</v-icon></v-btn>
    </template>
    <chat-room-details
      :value="value"
      :dark="theme.admin.chat.card.dark"
      :light="theme.admin.chat.card.light"
      :color="theme.admin.chat.card.color"
      :bubble-dark="theme.admin.chat.bubble.dark"
      :bubble-light="theme.admin.chat.bubble.light"
      :bubble-color="theme.admin.chat.bubble.color"
      show-close
      @close="onCloseDialog"
    />
  </v-dialog>
</template>

<script>
  import ChatRoomDetails from './ChatRoomDetails.vue'
  import Themeable from '../../../mixins/Themeable'

  export default {
    name: 'ChatRoomEditDialog',
    components: {
      ChatRoomDetails,
    },
    mixins: [
      Themeable,
    ],
    props: {
      value: Object,
      action: Object,
      activator: Object,
    },
    data: vm => ({
      dialog: false,
    }),
    methods: {
      onCloseDialog () {
        this.dialog = false
      },
      onAddMe ($renderer) {
        $renderer.markActionLoading(this.value, this.action, true)
        this.$store.dispatch('chat/addParticipant', {
          roomId: this.value?.id,
          userId: this.authUser?.id,
          flags: 1, // add as admin
        })
          .then(json => {
            this.$store.commit('snackbar/addMessage', {
              message: json.message,
              color: 'success',
            })
          })
          .catch(err => {
            this.$store.commit('snackbar/addMessage', {
              message: err.message,
              color: 'red',
            })
          })
          .finally(() => {
            $renderer.markActionLoading(this.value, this.action, false)
          })
      },
    },
  }
</script>
