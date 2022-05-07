<template>
  <v-input
    :label="label"
    :disabled="disabled"
    :rules="rules"
    :error-messages="errorMessages"
    :vertical="true"
  >
    <div ref="uploader" style="display: none;" />
    <v-btn ref="browse" style="display: none;" />
    <c-k-editor
      v-model="internalValue"
      :editor="editor"
      :config="editorConfig"
      @ready="onEditorReady"
      @input="onEditorChanged"
    />
  </v-input>

</template>

<script>
  import CKEditor from '@ckeditor/ckeditor5-vue2'

  export default {
    name: 'CKEditorInput',
    components: {
      CKEditor: CKEditor.component,
    },
    props: {
      label: String,
      disabled: Boolean,
      rules: Array,
      errorMessages: Array,
      value: String,
    },
    computed: {
      editor () {
        return this.$press.options.getCKEditor(this)
      },
      editorConfig () {
        return this.$press.options.getCKEditorConfig(this)
      }
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
      onEditorChanged () {
        this.$emit('input', this.internalValue)
      },
      onEditorReady (editor) {
        console.log('ready')
        editor.ui.view.editable.element.style.minHeight = '140px'
        editor.ui.view.editable.element.style.minWidth = '600px'
        const fileRepo = editor.plugins.get('FileRepository')
        fileRepo.createUploadAdapter = loader => {
          const ImageUploadAdapterClass = this.$press.options.getCKEditorImageAdapter(this)
          console.log(ImageUploadAdapterClass)
          return new ImageUploadAdapterClass(loader, {
            url: this.$store.getters.getUrl('/api/file-upload'),
            authHeader: this.$store.getters.authHeader,
            container: this.$refs.uploader.$el,
            browse: this.$refs.browse.$el,
            onError: err => {
              this.$store.commit('snackbar/addMessage', {
                message: err.message,
                color: 'red',
              })
            },
            getFileFromPath: path => {
              return this.$store.getters.getUrl('/storage/' + path)
            },
          })
        }
      },
    },
  }
</script>
