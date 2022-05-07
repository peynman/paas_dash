<template>
  <v-list-item dense two-line>
    <v-list-item-content>
      <v-list-item-title>{{ $t('components.admin.productCellarData.stockCount', { count: cellar.stock }) }}</v-list-item-title>
      <v-list-item-subtitle>
        <span>
          {{ $t('components.admin.productCellarData.size') }}
          <v-chip label small dense class="mx-1">{{ cellar.size }}</v-chip>
        </span>
        <span>
          {{ $t('components.admin.productCellarData.color') }}
          <v-chip label small dense class="mx-1">
            <v-icon :color="safeColor">mdi-record</v-icon>
            {{ cellar.color }}
          </v-chip>
        </span>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-dialog v-model="editDialog">
        <template v-slot:activator="{on}">
          <v-btn icon small color="secondary" v-on="on"><v-icon small>mdi-database-edit</v-icon></v-btn>
        </template>
        <edit-card :value="cellar" @input="onEdit" />
      </v-dialog>
      <confirm-remove-dialog @remove="$emit('remove', cellar)">
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
    name: 'ProductCellarDisplay',
    components: {
      EditCard,
      ConfirmRemoveDialog,
    },
    props: {
      cellar: Object,
    },
    data: vm => ({
      editDialog: false,
    }),
    computed: {
      safeColor () {
        if (this.cellar?.color && typeof this.cellar.color === 'string' && this.cellar?.color.startsWith('#')) {
          return this.cellar.color
        }

        return undefined
      },
    },
    methods: {
      onEdit (e) {
        this.editDialog = false
        this.$emit('update', e, this.cellar)
      },
    },
  }
</script>
