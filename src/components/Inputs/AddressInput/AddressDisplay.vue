<template>
  <v-list-item two-line dense>
    <v-list-item-content>
      <v-list-item-title>
        {{ internalValue.address }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <v-chip label dense x-small class="me-1">{{ provinceTitle }}</v-chip>
        <v-chip label dense x-small class="me-1">{{ cityTitle }}</v-chip>
        <v-chip label dense x-small>{{ internalValue.postal_code }}</v-chip>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-dialog v-model="dialog" @input="onDialogEvent">
        <template v-slot:activator="{on}">
          <v-btn icon :loading="loading" v-on="on"><v-icon small>mdi-database-edit</v-icon></v-btn>
        </template>
        <address-form
          ref="form"
          v-model="internalValue"
          :loading="loading"
          :dark="dark"
          :light="light"
          :color="color"
          @input="onEdit"
        />
      </v-dialog>
      <confirm-remove-dialog v-if="!hideRemove" @remove="onRemove">
        <template v-slot:activator="{on}">
          <v-btn icon color="red" :loading="loading" v-on="on"><v-icon small>mdi-database-remove</v-icon></v-btn>
        </template>
      </confirm-remove-dialog>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
  import ConfirmRemoveDialog from '../ConfirmDialog/ConfirmRemoveDialog.vue'
  import AddressForm from './AddressForm.vue'
  import Iran from '../../../mixins/Iran'
  import Themeable from '../../../mixins/Themeable'

  export default {
    name: 'AddressDisplay',
    components: { ConfirmRemoveDialog, AddressForm },
    mixins: [
      Iran,
      Themeable,
    ],
    props: {
      value: Object,
      dark: Boolean,
      light: Boolean,
      color: String,
      hideRemove: Boolean,
      loading: Boolean,
    },
    data: vm => ({
      dialog: false,
      internalValue: vm.value,
    }),
    computed: {
      province () {
        return this.provinces[this.internalValue?.province_code]
      },
      cityTitle () {
        return this.cities?.[this.internalValue?.city_code]?.text
      },
      provinceTitle () {
        return this.province?.text
      },
    },
    watch: {
      value () {
        this.internalValue = this.value
      },
    },
    methods: {
      onDialogEvent () {
        if (this.dialog && this.$refs.form) {
          this.$refs.form.resetMap()
        }
      },
      onRemove () {
        this.$emit('remove', this.value)
      },
      onEdit () {
        this.$emit('update', this.internalValue)
      },
    },
  }
</script>
