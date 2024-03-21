<template>
  <v-schema-renderer
    tag="VRow"
    :children="widgets"
    :components-dictionary="widgetsDictionary"
    :pre-processor="preProcessWidget"
  />
</template>

<script>
  import CrudRoute from '../mixins/CrudRoute'
  import FormValidations from '../mixins/FormValidations'
  import WidgetsRenderer from '../mixins/WidgetsRenderer'

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
