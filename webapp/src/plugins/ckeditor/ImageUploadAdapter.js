import plupload from 'plupload/js/plupload.dev'

export default class ImageUploadAdapter {
  constructor (loader, options) {
    // The file loader instance to use during the upload.
    this.loader = loader
    this.options = options
  }

  upload () {
    return new Promise((resolve, reject) => {
      this.loader.file.then(file => {
        this.uploader = new plupload.Uploader({
          url: this.options.url,
          method: 'POST',
          runtime: 'html5',
          headers: this.options.authHeader,
          chunk_size: this.options.chunkSize ?? '1mb',
          max_retries: this.options.maxRetries ?? 0,
          container: this.options.container,
          browse_button: this.options.browse,
          init: {
            PostInit: uploader => {
              uploader.settings.multipart_params = {
                access: 'public',
              }
              this.uploader.addFile(file)

              this.loader.uploadTotal = file.size
              this.loader.uploaded = 0
              this.uploader.start()
            },
            UploadProgress: (up, file) => {
              this.loader.uploaded = file.loaded
            },
            FileUploaded: (up, file, result) => {
              try {
                const response = JSON.parse(result.response)
                resolve({
                  default: this.options.getFileFromPath(response.result.path),
                })
              } catch (e) {
                reject(e)
              }
            },
            Error: (up, err) => {
              console.log('error', err)
              this.uploader.stop()
              this.options.onError(err)
              reject(err)
            },
          },
        })
        this.uploader.init()
      })
    })
  }

  abort () {
    // Reject the promise returned from the upload() method.
    if (this.uploader) {
      this.uploader.stop()
    }
  }
}
