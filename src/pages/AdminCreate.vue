<template>
  <div v-if="crud" class="d-flex flex-column">
    <v-crud-api-form
      :title="title"
      :crud="crud"
      :user-data="authUser"
      api="create"
    />
  </div>
</template>

<script>
  import User from '@peynman/press-vue-core/mixins/User'
  import CrudRoute from '@peynman/press-vue-core/mixins/CrudRoute'
  import FormValidations from '@peynman/press-vue-core/mixins/FormValidations'
  import { VCrudApiForm } from 'vuetify/lib/components/VCrud'
  import WidgetsRenderer from '@peynman/press-vue-core/mixins/WidgetsRenderer'

  export default {
    name: 'AdminCreate',
    components: {
      VCrudApiForm,
    },
    mixins: [
      User,
      CrudRoute,
      WidgetsRenderer,
      FormValidations(),
    ],
    computed: {
      title () {
        return this.$t('components.admin.crud.titles.create', {
          crud: this.$t(`components.admin.crud.${this.crudTranslationsKey}.singular`),
        })
      },
    },
  }
</script>
