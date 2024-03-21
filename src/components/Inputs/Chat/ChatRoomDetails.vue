<template>
  <v-card :color="color" :dark="dark" :light="light">
    <v-card-title>
      <v-tooltip v-if="showClose" top>
        <template v-slot:activator="{on}">
          <v-btn icon small color="warning" @click="$emit('close')" v-on="on">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </template>
        {{ $t('components.website.chat.close') }}
      </v-tooltip>
      <div class="d-flex flex-row justify-space-between align-center flex-grow-1">
        <span>
          {{ roomTitle }}
        </span>
        <div class="d-flex flex-column">
          <v-chip small label class="mb-1">
            {{ roomTypeString }}
          </v-chip>
          <v-chip small label>
            {{ roomTimestamp }}
          </v-chip>
        </div>
      </div>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-list>
        <div v-for="(msg, index) in roomMessages" :key="`chat-message-${index}`">
          <chat-message-item
            :color="bubbleColor"
            :dark="bubbleDark"
            :light="bubbleLight"
            :value="msg"
          />
          <v-divider v-if="index < roomMessages.length - 1" />
        </div>
        <v-list-item v-if="loading">
          <v-list-item-content>
            <v-progress-circular indeterminate />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="total > roomMessages.length && !loading">
          <v-list-item-content>
            <v-btn text small @click="loadNextPage">{{ $t('components.website.chat.loadMore') }}</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-divider />
    <v-card-text>
      <chat-message-form :room-id="internalValue.id" @sent-message="onSentNewMessage" />
    </v-card-text>
    <v-card-actions v-if="showClose">
      <v-spacer />
      <v-btn text color="warning" @click="$emit('close')">{{ $t('components.website.chat.close') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import ChatRoom from '../../../mixins/ChatRoom'
  import ChatMessageItem from './ChatMessageItem'
  import ChatMessageForm from './ChatMessageForm'

  export default {
    name: 'ChatRoomDetails',
    components: {
      ChatMessageItem,
      ChatMessageForm,
    },
    mixins: [
      ChatRoom,
    ],
    props: {
      value: [Object, Number],
      color: String,
      dark: Boolean,
      light: Boolean,
      bubbleColor: String,
      bubbleDark: Boolean,
      bubbleLight: Boolean,
      showClose: Boolean,
    },
    data: vm => ({
      internalValue: vm.value,
      page: -1, // load next adds 1
      loading: false,
      total: false,
    }),
    computed: {
      room () {
        return this.internalValue
      },
    },
    mounted () {
      this.loadNextPage()
    },
    methods: {
      onSentNewMessage (msg) {
        this.internalValue.messages.unshift(msg)
      },
      loadNextPage () {
        this.loading = true
        this.page += 1
        this.$store.dispatch('chat/fetchRoomMessages', {
          roomId: this.room?.id,
          page: this.page,
        })
          .then(json => {
            this.page = json.currPage
            this.total = json.total
            if (!this.internalValue.messages) {
              this.$set(this.internalValue, 'messages', json.items)
            } else {
              this.internalValue.messages.push(...json.items)
            }
          })
          .catch(err => {
            this.$store.commit('snackbar/addMessage', {
              message: err.message,
              color: 'red',
            })
          })
          .finally(() => {
            this.loading = false
          })
      },
    },
  }
</script>
