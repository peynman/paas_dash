<template>
  <div class="d-flex flex-column">
    <span>{{ value.title }}</span>
    <div class="d-flex flex-row flex-wrap align-center justify-center">
      <v-chip dense x-small label class="me-1">{{ value.storage }}</v-chip>
      <v-chip dense x-small label>{{ value.filename }}</v-chip>
      <v-btn small icon @click="copyPathToClipboard"><v-icon x-small>mdi-map-marker-path</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FileDetailsColumn',
    props: {
      value: Object,
    },
    methods: {
      copyPathToClipboard () {
        function fallbackCopyTextToClipboard (text) {
          var textArea = document.createElement('textarea')
          textArea.value = text

          // Avoid scrolling to bottom
          textArea.style.top = '0'
          textArea.style.left = '0'
          textArea.style.position = 'fixed'

          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()

          try {
            var successful = document.execCommand('copy')
            var msg = successful ? 'successful' : 'unsuccessful'
            console.log('Fallback: Copying text command was ' + msg)
          } catch (err) {
            console.error('Fallback: Oops, unable to copy', err)
          }

          document.body.removeChild(textArea)
        }
        function copyTextToClipboard (text) {
          if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text)
            return
          }
          navigator.clipboard.writeText(text).then(function () {
            console.log('Async: Copying to clipboard was successful!')
          }, function (err) {
            console.error('Async: Could not copy text: ', err)
          })
        }

        copyTextToClipboard(`/storage${this.value.path}`)
      },
    },
  }
</script>
