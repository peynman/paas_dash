<template>
  <v-text-field
    v-model="internalValue"
    :label="label"
    :hint="hint"
    @change="onChangeDirect"
  >
    <template v-slot:append>
      <v-dialog>
        <template v-slot:activator="{on}">
          <v-btn icon small v-on="on"><v-icon small>mdi-upload</v-icon></v-btn>
        </template>
        <v-card>
          <v-card-title>{{ $t('components.admin.filePath.title') }}</v-card-title>
          <v-card-text>
            <file-upload-input v-model="fileArray" @input="onFileUploaded" />
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
  </v-text-field>
</template>

<script>
  import FileUploadInput from '../FileUploadInput/FileUploadInput.vue'

  export default {
    name: 'FilePathInput',
    components: {
      FileUploadInput,
    },
    props: {
      value: String,
      label: String,
      hint: String,
    },
    data: vm => ({
      internalValue: vm.value,
      fileArray: vm.value ? [vm.value] : [],
    }),
    watch: {
      value () {
        this.internalValue = this.value
      },
    },
    methods: {
      onFileUploaded () {
        this.internalValue = '/storage' + this.fileArray[this.fileArray.length - 1].path
        this.$emit('input', this.internalValue)
      },
      onChangeDirect () {
        this.$emit('input', this.internalValue)
      },
    },
  }
</script>
