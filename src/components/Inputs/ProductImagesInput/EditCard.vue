<template>
  <v-card>
    <v-card-title>{{ $t('components.admin.productImages.addTitle') }}</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <image-upload-input
          v-model="image"
          :label="$t('components.admin.productImages.image')"
          :image-width="imageWidth"
          :image-height="imageHeight"
          clearable
        />
        <v-text-field
          v-model="width"
          type="number"
          :label="$t('components.admin.productImages.imageWidth')"
        />
        <v-text-field
          v-model="height"
          type="number"
          :label="$t('components.admin.productImages.imageHeight')"
        />
        <v-select
          v-model="mode"
          :items="imageModes"
          :label="$t('components.admin.productImages.imageMode')"
        />
        <v-text-field
          v-model="alt"
          :label="$t('components.admin.productImages.alt')"
        />
        <v-text-field
          v-model="ref"
          :label="$t('components.admin.productImages.refrenceIdLabel')"
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn class="success" @click="addImage">{{ $t('components.admin.productImages.add') }}</v-btn>
    </v-card-actions>  </v-card>
</template>

<script>
  import ImageUploadInput from '../ImageUploadInput/ImageUploadInput.vue'
  import Themeable from '@peynman/press-vue-core/mixins/Themeable'

  export default {
    name: 'EditCard',
    components: { ImageUploadInput },
    mixins: [Themeable],
    props: {
      value: Object,
    },
    data: vm => ({
      valid: true,
      width: vm.value?.width,
      height: vm.value?.height,
      image: vm.value?.image,
      mode: vm.value?.mode,
      alt: vm.value?.alt,
      ref: vm.value?.ref,
      imageModes: [
        {
          text: 'Cover',
          value: 'cover',
        },
        {
          text: 'Contain',
          value: 'contain',
        },
      ],
    }),
    computed: {
      imageWidth () {
        return this.width ? parseInt(this.width) : this.theme.admin.productImages.width
      },
      imageHeight () {
        return this.height ? parseInt(this.height) : this.theme.admin.productImages.height
      },
    },
    watch: {
      value (n) {
        this.width = this.value?.width
        this.height = this.value?.height
        this.mode = this.value?.mode
        this.image = this.value?.image
        this.alt = this.value?.alt
        this.ref = this.value?.ref
      },
    },
    methods: {
      addImage () {
        this.$refs.form.validate()

        if (this.valid) {
          this.$emit('input', {
            width: this.imageWidth,
            height: this.imageHeight,
            image: this.image,
            mode: this.mode,
            alt: this.alt,
            ref: this.ref,
          })
          this.width = null
          this.height = null
          this.mode = null
          this.image = null
          this.alt = null
          this.ref = null
        }
      },
    },
  }
</script>
