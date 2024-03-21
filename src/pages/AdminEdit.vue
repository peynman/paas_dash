<template>
  <crud-editor :crud="crud" :object-id="objectId" :crud-name="crudName" />
</template>

<script>
  import FormValidations from '../mixins/FormValidations'
  import CrudRoute from '../mixins/CrudRoute'
  import CrudEditor from '../components/Inputs/CrudEditor/CrudEditor.vue'
  import WidgetsRenderer from '../mixins/WidgetsRenderer'

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
