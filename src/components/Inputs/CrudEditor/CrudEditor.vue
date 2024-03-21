<template>
  <div v-if="crud" class="d-flex flex-column flex-grow-1">
    <validations-alert :type="formAlertType" :errors="formAlertErrorList" :message="formAlertMessage" />
    <v-crud-api-form
      :crud="crud"
      api="edit"
      :value="object"
      :loading="loading"
      :title="title"
      :object-id="9"
    />
  </div>
</template>

<script>
  import User from '../../../mixins/User'
  import FormValidations from '../../../mixins/FormValidations'
  import ValidationsAlert from '..//ValidationsAlert/ValidationsAlert.vue'
  import { VCrudApiForm } from 'vuetify/lib/components/VCrud'
  import { getCrudResourceFolderFromName } from '../../../utils/crud'

  export default {
    name: 'CrudEditor',
    components: {
      ValidationsAlert,
      VCrudApiForm,
    },
    mixins: [
      User,
      FormValidations(),
    ],
    props: {
      crud: Object,
      objectId: [String, Number],
      crudName: String,
      value: Object,
    },
    data: vm => ({
      loading: false,
      object: vm.value,
    }),
    computed: {
      crudFolderName () {
        return getCrudResourceFolderFromName(this.crudName)
      },
      crudTranslationsKey () {
        return this.crudFolderName.charAt(0).toLowerCase() + this.crudFolderName.slice(1)
      },
      title () {
        return this.$t('components.admin.crud.titles.edit', {
          crud: this.$t(`components.admin.crud.${this.crudTranslationsKey}.singular`),
          id: this.$n(this.objectId),
        })
      },
    },
    watch: {
      crud () {
        this.object = null
        this.refreshData()
      },
      objectId () {
        this.object = null
        this.refreshData()
      },
    },
    mounted () {
      this.refreshData()
    },
    methods: {
      refreshData () {
        if (!this.objectId) {
          return
        }
        if (this.object) {
          return
        }

        this.loading = true
        this.$store.dispatch('repos/fetchObject', {
          id: this.objectId,
          name: this.crudName,
        }).then(obj => {
          this.resetFormValidations()
          if (this.crud.onBeforeAdminEdit) {
            this.object = this.crud.onBeforeAdminEdit(obj)
          } else {
            this.object = obj
          }
        }).catch(error => {
          this.updateFormValidationErrors(error)
        }).finally(() => {
          this.loading = false
        })
      },
    },

  }
</script>
