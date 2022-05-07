<template>
  <div class="d-flex flex-row align-center justify-center">
    <div class="d-flex flex-column justify-start align-start">
      <span>{{ domain.domain }}</span>
      <div class="d-flex flex-row">
        <v-chip v-for="(af, i) in getActiveFlags(domain)" :key="`domain-flag-details-${i}`" small>
          {{ af }}
        </v-chip>
      </div>
    </div>
    <div class="d-flex flex-column">
      <v-dialog v-model="editDialog">
        <template v-slot:activator="{on}">
          <v-btn icon small color="secondary" v-on="on"><v-icon small>mdi-database-edit</v-icon></v-btn>
        </template>
        <edit-card :value="domain" @input="onEdit" />
      </v-dialog>
      <confirm-remove-dialog @success="$emit('remove', domain)">
        <template v-slot:activator="{on}">
          <v-btn icon small color="red" v-on="on"><v-icon small>mdi-database-remove</v-icon></v-btn>
        </template>
      </confirm-remove-dialog>
    </div>
  </div>
</template>

<script>
  import ConfirmRemoveDialog from '../ConfirmDialog/ConfirmRemoveDialog.vue'
  import EditCard from './EditCard.vue'

  export default {
    name: 'DomainDisplay',
    components: {
      ConfirmRemoveDialog,
      EditCard,
    },
    props: {
      domain: Object,
      getActiveFlags: Function,
    },
    data: vm => ({
      editDialog: false,
    }),
    methods: {
      onEdit (e) {
        this.editDialog = false
        this.$emit('update', e, this.domain)
      },
    },
  }
</script>
