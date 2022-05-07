<template>
  <v-list-item dense two-line>
    <v-list-item-avatar>
      <v-img :src="imageSrc" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ image.alt }}</v-list-item-title>
      <v-list-item-subtitle>{{ image.width }}x{{ image.height }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-dialog v-model="editDialog">
        <template v-slot:activator="{on}">
          <v-btn icon small color="secondary" v-on="on"><v-icon small>mdi-database-edit</v-icon></v-btn>
        </template>
        <edit-card :value="image" @input="onEdit" />
      </v-dialog>
      <confirm-remove-dialog @remove="$emit('remove', image)">
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
    name: 'ProductImageDisplay',
    components: {
      EditCard,
      ConfirmRemoveDialog,
    },
    props: {
      image: Object,
    },
    data: vm => ({
      editDialog: false,
    }),
    computed: {
      imageSrc () {
        if (this.image?.image?.startsWith('data:image')) {
          return this.image.image
        }

        return this.$store.getters.getUrl(this.image.image)
      },
    },
    methods: {
      onEdit (e) {
        this.editDialog = false
        this.$emit('update', e, this.image)
      },
    },
  }
</script>
