<template>
  <v-card class="mb-4">
    <v-card-text>{{ label }}: {{ title }}</v-card-text>
    <v-divider />
    <v-card-text>
      <v-schema-renderer
        v-if="children"
        v-model="internalValue"
        :children="children"
        :components-dictionary="widgetsDictionary"
        :pre-processor="preProcessWidget"
        @input="$emit('input', internalValue)"
      />
      <span v-else>{{ $t('components.admin.schemaForm.empty') }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
  import WidgetsRenderer from '@peynman/press-vue-core/mixins/WidgetsRenderer'
  import FormValidations from '@peynman/press-vue-core/mixins/FormValidations'

  export default {
    name: 'SchemaFormInput',
    mixins: [
      WidgetsRenderer,
      FormValidations(),
    ],
    props: {
      label: String,
      formSource: Object,
      value: Object,
    },
    data: vm => ({
      internalValue: vm.value ?? {},
    }),
    computed: {
      children () {
        return this.formSource?.schema.children
      },
      title () {
        return this.formSource?.text
      },
    },
    watch: {
      value () {
        this.internalValue = this.value ?? {}
      },
    },
  }
</script>
