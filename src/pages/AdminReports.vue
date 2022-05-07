<template>
  <v-schema-renderer
    tag="VRow"
    :children="widgets"
    :components-dictionary="widgetsDictionary"
    :pre-processor="preProcessWidget"
  />
</template>

<script>
  import CrudRoute from '@peynman/press-vue-core/mixins/CrudRoute'
  import FormValidations from '@peynman/press-vue-core/mixins/FormValidations'
  import WidgetsRenderer from '@peynman/press-vue-core/mixins/WidgetsRenderer'

  export default {
    name: 'AdminReports',
    mixins: [
      WidgetsRenderer,
      CrudRoute,
      FormValidations(),
    ],
    computed: {
      widgets () {
        return this.getSchemaChildrenForWidgets(this.crud?.reports)
      },
    },
  }
</script>
