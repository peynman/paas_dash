<template>
  <v-list-item dense two-line>
    <v-list-item-content>
      <v-list-item-title>{{ phone.number }}</v-list-item-title>
      <v-list-item-subtitle>
        <v-chip
          v-for="(af, i) in getActiveFlags(phone)"
          :key="`phone-flag-details-${i}`"
          class="me-1"
          label
          x-small
        >
          {{ af }}
        </v-chip>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-dialog v-model="editDialog">
        <template v-slot:activator="{on}">
          <v-btn icon small color="secondary" v-on="on"><v-icon small>mdi-database-edit</v-icon></v-btn>
        </template>
        <edit-card :value="phone" :item-flags="itemFlags" @input="onEdit" />
      </v-dialog>
      <confirm-remove-dialog @remove="$emit('remove', phone)">
        <template v-slot:activator="{on}">
          <v-btn icon small color="red" v-on="on"><v-icon small>mdi-database-remove</v-icon></v-btn>
        </template>
      </confirm-remove-dialog>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
  import ConfirmRemoveDialog from '../ConfirmDialog/ConfirmRemoveDialog.vue'
  import EditCard from './EditCard.vue'

  export default {
    name: 'PhoneNumberDisplay',
    components: {
      EditCard,
      ConfirmRemoveDialog,
    },
    props: {
      phone: Object,
      itemFlags: Array,
      getActiveFlags: Function,
    },
    data: vm => ({
      editDialog: false,
    }),
    methods: {
      onEdit (e) {
        this.editDialog = false
        this.$emit('update', e, this.phone)
      },
    },
  }
</script>
