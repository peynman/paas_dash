<template>
  <crud-editor :crud="crud" :object-id="objectId" :crud-name="crudName" />
</template>

<script>
  import FormValidations from '@peynman/press-vue-core/mixins/FormValidations'
  import CrudRoute from '@peynman/press-vue-core/mixins/CrudRoute'
  import CrudEditor from '../components/Inputs/CrudEditor/CrudEditor.vue'
  import WidgetsRenderer from '@peynman/press-vue-core/mixins/WidgetsRenderer'

  export default {
    name: 'AdminEdit',
    components: {
      CrudEditor,
    },
    mixins: [
      CrudRoute,
      WidgetsRenderer,
      FormValidations(), // needed on forms for rules
    ],
    props: {
      objectId: String,
    },
  }
</script>
