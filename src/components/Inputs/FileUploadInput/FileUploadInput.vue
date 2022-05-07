<template>
  <div class="d-flex flex-column">
    <div :id="`container-${id}`" ref="container" class="d-flex flex-row justify-space-between">
      <label>{{ label }}</label>
      <v-list-item-subtitle v-if="hint">
        {{ hint }}
      </v-list-item-subtitle>
      <div>
        <v-btn
          :id="`browse-${id}`"
          ref="browse"
          text
          small
          color="primary"
          href="javascript:;"
          class="no-letter-spacing"
          :disabled="loading"
        >
          {{ $t('components.admin.fileUpload.browse') }}
        </v-btn>
        <v-btn
          text
          small
          color="success"
          :disabled="loading"
          class="no-letter-spacing"
          @click="startUpload()"
        >
          {{ $t('components.admin.fileUpload.start') }}
        </v-btn>
        <v-btn
          text
          small
          color="warning"
          class="no-letter-spacing"
          :disabled="!loading"
          @click="pauseUpload()"
        >
          {{ $t('components.admin.fileUpload.pause') }}
        </v-btn>
      </div>
    </div>
    <v-list dense>
      <v-list-item v-for="(file, index) in files" :key="`${id}-file-${index}`">
        <v-list-item-avatar size="80">
          <v-progress-circular :value="file.percent" size="70" class="ma-auto">
            <div class="d-flex flex-column justify-center alight-center">
              <v-progress-circular v-if="file.status === 2" size="20" width="2" />
              <v-icon v-if="file.status === 5" color="success">
                mdi-check-decagram
              </v-icon>
              <v-icon v-if="file.status === 4" color="red">
                mdi-alert
              </v-icon>
              %{{ file.percent }}
            </div>
          </v-progress-circular>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ file.name }}</v-list-item-title>
          <v-list-item-subtitle>
            <strong>Type</strong>
            {{ file.type }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <strong>Size</strong>
            {{ file.size }} bytes
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-text-field
            v-model="file.title"
            :label="$t('components.admin.fileUpload.filename')"
            solo
            dense
            hide-details
          />
          <v-select
            v-model="file.access"
            :label="$t('components.admin.fileUpload.access')"
            class="pt-1"
            :items="availableAccessModes"
            solo
            dense
            hide-details
          />
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon color="red" @click="onRemoveFile(file)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="files.length === 0">
        <v-list-item-title>
          {{ $t('components.admin.fileUpload.empty') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
  import plupload from 'plupload/js/plupload.dev'
  import { mapGetters } from 'vuex'

  export default {
    name: 'FileUploadInput',
    components: {},
    props: {
      label: String,
      hint: String,
      chunkSize: Number,
      maxRetries: Number,
      preventDuplicates: Boolean,
      maxFileSize: Number,
      filters: Array,
      id: String,
      returnLastFile: Boolean,
      value: [Array, String, Object],
    },
    data: vm => ({
      uploader: null,
      files: [],
      loading: false,
      internalValue: vm.value ?? [],
    }),
    computed: {
      ...mapGetters('fileshare', [
        'availableAccessModes',
      ]),
    },
    watch: {
      value () {
        this.internalValue = this.value ?? []
      },
    },
    mounted () {
      this.uploader = new plupload.Uploader({
        url: this.$store.getters.getUrl('/api/file-upload'),
        method: 'POST',
        runtime: 'html5',
        headers: this.$store.getters.authHeader,
        browse_button: this.$refs.browse.$el,
        container: this.$refs.container.$el,
        chunk_size: this.chunkSize ?? '1mb',
        max_retries: this.maxRetries ?? 0,
        filters: {
          mime_types: this.filters ?? [{
            title: 'Image',
            extensions: 'jpg,png,jpeg',
          }],
          prevent_duplicates: this.preventDuplicates !== undefined ?? true,
          max_file_size: this.maxFileSize ?? '100m',
        },
        init: {
          PostInit: uploader => {

          },
          FilesAdded: (up, files) => {
            files.forEach(file => {
              this.files.push({
                ...file,
                access: 'private',
                title: file.name,
              })
            })
          },
          UploadProgress: (up, file) => {
            const fileRef = this.getFileById(file.id)
            if (fileRef) {
              this.$set(fileRef, 'percent', file.percent)
            }
          },
          FileUploaded: (up, file, result) => {
            const fileRef = this.getFileById(file.id)
            if (fileRef) {
              this.$set(fileRef, 'percent', file.percent)
              this.$set(fileRef, 'status', file.status)
            }
            if (result.response) {
              try {
                const json = JSON.parse(result.response)
                if (!this.returnLastFile) {
                  if (!Array.isArray(this.internalValue)) {
                    this.internalValue = []
                  }
                  this.internalValue.push(json.result)
                  this.$emit('input', this.internalValue)
                } else {
                  this.internalValue = json.result
                  this.$emit('input', this.internalValue)
                }
              } catch (e) {
                console.error(e)
              }
            }
          },
          BeforeUpload: (up, file) => {
            const fileRef = this.getFileById(file.id)
            if (fileRef) {
              up.settings.multipart_params = {
                access: fileRef.access,
                title: fileRef.title,
              }
              this.loading = true
              this.$set(fileRef, 'percent', file.percent)
              this.$set(fileRef, 'status', file.status)
            }
          },
          UploadComplete: (up, files) => {
            this.loading = false
            files.forEach(file => {
              const fileRef = this.getFileById(file.id)
              if (fileRef) {
                this.$set(fileRef, 'percent', file.percent)
                this.$set(fileRef, 'status', file.status)
              }
            })
          },
          Error: (up, err) => {
            console.log(err)
            this.loading = false
            if (err.file) {
              const fileRef = this.getFileById(err.file.id)
              if (fileRef) {
                this.$set(fileRef, 'status', err.file.status)
              }
            }
            this.uploader.stop()
            this.$store.commit('snackbar/addMessage', {
              message: err.message,
              color: 'red',
            })
          },
        },
      })
      this.uploader.init()
    },
    methods: {
      onRemoveFile (file) {
        this.files.splice(this.files.indexOf(file), 1)
        this.uploader.removeFile(this.uploader.getFile(file.id))
      },
      getFileById (id) {
        const index = this.files.map(f => f.id).indexOf(id)
        if (index >= 0) {
          return this.files[index]
        }

        return null
      },
      startUpload () {
        this.uploader.files.forEach(f => {
          if (f.status === plupload.FAILED) {
            f.status = plupload.STOPPED
          }
        })
        this.uploader.start()
      },
      pauseUpload () {
        this.uploader.stop()
      },
    },
  }
</script>
