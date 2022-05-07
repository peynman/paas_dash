<template>
  <div>
    <v-snackbar
      v-for="(msg, index) in messages"
      :key="`snackmessage-${index}`"
      v-model="msg.visible"
      :color="msg.color"
    >
      {{ msg.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-if="msg.actionTitle"
          text
          :color="msg.actionColor"
          v-bind="attrs"
          @click="msg.actionCallback"
        >{{ msg.actionTitle }}</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('snackbar', [
        'messages',
      ]),
    },
  }
</script>
