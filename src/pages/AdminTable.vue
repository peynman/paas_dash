<template>
  <div v-if="crud" class="d-flex flex-column">
    <validations-alert
      :type="formAlertType"
      :message="formAlertMessage"
      :errors="formAlertErrorList"
    />
    <confirm-remove-dialog
      v-model="confirmDialog"
      @remove="onConfirmRemove"
      @cancel="onDontRemove"
    />
    <v-dialog v-model="editDialog">
      <crud-editor
        :crud="crud"
        :object-id="editingObjectId"
        :crud-name="crudName"
      />
    </v-dialog>
    <v-card>
      <v-crud
        v-if="ready"
        ref="table"
        :crud="crud"
        :user-data="authUser"
        :value-settings="tableSettings"
        :value-filters="tableFilters"
        :label="label"
        :items="queryCrudResource"
        :total-visible="10"
        :components-dictionary="componentsDictionary"
        flat
        @edit="onEditItem"
        @remove="onRemoveItem"
        @save-settings="saveSettings"
        @save-filters="saveFilters"
        @reset-filters="resetFilters"
        @reset-settings="resetSettings"
      />
    </v-card>
  </div>
</template>

<script>
  import User from '@peynman/press-vue-core/mixins/User'
  import CrudRoute from '@peynman/press-vue-core/mixins/CrudRoute'
  import CrudTable from '@peynman/press-vue-core/mixins/CrudTable'
  import ValidationsAlert from '../components/Inputs/ValidationsAlert/ValidationsAlert.vue'
  import ConfirmRemoveDialog from '../components/Inputs/ConfirmDialog/ConfirmRemoveDialog.vue'
  import CrudEditor from '../components/Inputs/CrudEditor/CrudEditor.vue'

  export default {
    name: 'AdminTable',
    components: {
      ValidationsAlert,
      ConfirmRemoveDialog,
      CrudEditor,
    },
    mixins: [
      User,
      CrudRoute,
      CrudTable,
    ],
    data: vm => ({
      confirmDialog: false,
      removeCallback: null,
      dontRemoveCallback: null,
      editDialog: false,
      editingObjectId: null,
      ready: false,
      tableSettings: {
        loadRelations: {},
        perPage: 10,
      },
      tableFilters: {},
    }),
    computed: {
      label () {
        return this.$t('components.admin.crud.titles.table', {
          crud: this.$t(`components.admin.crud.${this.crudTranslationsKey}.plural`),
        })
      },
      componentsDictionary () {
        return this.$press?.getRendererDictionary(this) ?? {}
      }
    },
    watch: {
      crud (n, o) {
        if (this.$refs.table && o) {
          this.$nextTick(() => {
            this.onCrudLoaded()
            this.$refs.table.reset()
            this.$refs.table.reload()
          })
        }
      },
    },
    methods: {
      onCrudLoaded () {
        setTimeout(() => {
          this.tableSettings = this.getSavedSettings(this.crud)
          this.tableFilters = this.getSavedFilters(this.crud)
          this.ready = true
        }, 2000)
      },
      onEditItem (table, item) {
        this.editingObjectId = item[this.crud.primaryKey]
        this.editDialog = true
      },
      onRemoveItem (table, item) {
        this.$set(item, '_class', 'red')
        this.removeCallback = () => {
          this.$set(item, '_class', 'removing-item')
          this.sendDeleteItemRequest(this.crud, item)
            .then(json => {
              table.removeItem(item)
              this.updateFormSuccessMessage(json.message)
            })
            .catch(error => {
              this.updateFormValidationErrors(error)
            })
            .finally(() => {
              this.$set(item, '_class', '')
            })
        }
        this.dontRemoveCallback = () => {
          this.$set(item, '_class', '')
        }
        this.confirmDialog = true
      },
      onConfirmRemove () {
        if (this.removeCallback) {
          this.removeCallback()
          this.removeCallback = null
        }
      },
      onDontRemove () {
        if (this.dontRemoveCallback) {
          this.dontRemoveCallback()
          this.dontRemoveCallback = null
        }
      },
    },
  }
</script>
