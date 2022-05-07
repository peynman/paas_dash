<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{on}">
      <slot name="activator" :on="on" />
    </template>
    <confirm-card
      :title="titleString"
      dark
      color="red"
      ok-color="red"
      cancel-color="primary"
      @success="onSuccess"
      @cancel="onCacnel"
    />
  </v-dialog>
</template>

<script>
  import ConfirmCard from './ConfirmCard.vue'

  export default {
    name: 'ConfirmRemoveDialog',
    components: {
      ConfirmCard,
    },
    props: {
      title: String,
      value: Boolean,
    },
    data: vm => ({
      dialog: vm.value,
      accepted: false,
    }),
    computed: {
      titleString () {
        return this.title || this.$t('components.admin.confirmDialog.removeTitle')
      },
    },
    watch: {
      value () {
        this.dialog = this.value
        this.accepted = false
      },
      dialog () {
        if (!this.dialog && !this.accepted) {
          this.$emit('cancel')
        }
        this.$emit('input', this.dialog)
        this.accepted = false
      },
    },
    methods: {
      onSuccess () {
        this.dialog = false
        this.accepted = true
        this.$emit('remove')
      },
      onCacnel () {
        this.dialog = false
        this.accepted = false
        this.$emit('cancel')
      },
    },
  }
</script>
