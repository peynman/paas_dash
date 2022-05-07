<template>
  <div class="d-flex flex-column justify-center align-start">
    <v-input
      :label="label"
      :rules="rules"
      :error-messages="errorMessages"
      vertical
      :value="internalValue"
      :disabled="disabled"
    >
      <v-image-input
        v-model="imageSrcValue"
        style="direction: ltr;"
        class="mt-3"
        :image-quality="1"
        :image-width="imageWidth"
        :image-height="imageHeight"
        :image-max-scaling="imageMaxScaling"
        :image-min-scaling="imageMinScaling"
        :clearable="clearable"
        :full-width="fullWidth"
        :full-height="fullHeight"
      />
    </v-input>
  </div>
</template>

<script>
  import VImageInput from 'vuetify-image-input'

  export default {
    name: 'ImageUploadInput',
    components: {
      VImageInput,
    },
    props: {
      label: String,
      imageWidth: Number,
      imageHeight: Number,
      imageMaxScaling: Number,
      imageMinScaling: String,
      fullWidth: Boolean,
      fullHeight: Boolean,
      clearable: Boolean,
      value: String,
      rules: Array,
      disabled: Boolean,
      errorMessages: Array,
    },
    data: vm => ({
      internalValue: vm.value,
    }),
    computed: {
      imageSrcValue: {
        set (v) {
          this.internalValue = v
          this.$emit('input', this.internalValue)
        },
        get () {
          if (this.internalValue?.startsWith('data:image') || this.internalValue?.startsWith('http')) {
            return this.internalValue
          }
          return this.$store.getters.getUrl(this.internalValue)
        },
      },
    },
    watch: {
      value () {
        this.internalValue = this.value
      },
    },
  }
</script>
