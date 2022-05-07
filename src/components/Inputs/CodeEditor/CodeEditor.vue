<template>
  <v-input
    :dark="dark"
    :light="light"
    :value="internalValue"
    :rules="rules"
    :error-messages="errorMessages"
    :label="label"
    vertical
  >
    <v-sheet
      class="my-1"
      style="width: 100%; max-height: 240px; overflow-y: auto;"
    >
      <prism-editor
        v-model="internalValue"
        class="my-editor"
        :highlight="highlighter"
        line-numbers
        @input="$emit('input', internalValue)"
      />
    </v-sheet>
  </v-input>
</template>

<script>
  import { PrismEditor } from 'vue-prism-editor'
  import 'vue-prism-editor/dist/prismeditor.min.css'
  import { highlight, languages } from 'prismjs/components/prism-core'
  import 'prismjs/components/prism-clike'
  import 'prismjs/components/prism-javascript'
  import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles

  export default {
    name: 'CodeEditor',
    components: {
      PrismEditor,
    },
    props: {
      dark: Boolean,
      light: Boolean,
      label: String,
      rules: Array,
      errorMessages: Array,
      value: String,
    },
    data: vm => ({
      internalValue: vm.value,
    }),
    watch: {
      value () {
        this.internalValue = this.value
      },
    },
    methods: {
      highlighter (code) {
        return highlight(code, languages.js) // languages.<insert language> to return html with markup
      },
    },
  }
</script>

<style>
  /* required class */
  .v-application .my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: monospace !important;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
    min-height: 140px;
    direction: ltr;
  }
  .v-application .my-editor pre {
    font-family: monospace !important;
  }
</style>
