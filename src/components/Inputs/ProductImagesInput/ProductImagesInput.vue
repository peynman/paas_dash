<template>
  <v-input
    :label="label"
    :error-mesages="errorMessages"
    :rules="rules"
    :value="value"
    :vertical="true"
    :disabled="disabled"
  >
    <template v-slot:prepend>
      <v-dialog>
        <template v-slot:activator="{on}">
          <v-btn color="success" icon v-on="on"><v-icon>mdi-plus-box</v-icon></v-btn>
        </template>
        <edit-card @input="onAddNewImage" />
      </v-dialog>
    </template>
    <v-list dense two-line>
      <div v-for="(image, index) in internalValue" :key="`phone-${index}`" class="d-flex flex-column">
        <product-image-display
          :image="image"
          @update="onUpdateImage"
          @remove="onRemoveImage"
        />
        <v-divider />
      </div>
    </v-list>
  </v-input>
</template>

<script>
  import EditCard from './EditCard.vue'
  import ProductImageDisplay from './ProductImageDisplay.vue'

  export default {
    name: 'ProductImagesInput',
    components: {
      EditCard,
      ProductImageDisplay,
    },
    props: {
      label: String,
      rules: Array,
      disabled: Boolean,
      errorMessages: Array,
      value: Array,
      default: () => ([]),
    },
    data: vm => ({
      internalValue: vm.value ?? [],
    }),
    watch: {
      value () {
        this.internalValue = this.value ?? []
      },
    },
    methods: {
      onAddNewImage (image) {
        this.internalValue.push(image)
        this.$emit('input', this.internalValue)
      },
      onUpdateImage (n, o) {
        const index = this.internalValue.indexOf(o)
        if (index >= 0) {
          this.$set(this.internalValue, index, n)
          this.$emit('input', this.internalValue)
        }
        this.editDialog = false
      },
      onRemoveImage (image) {
        const index = this.internalValue.indexOf(image)
        if (index >= 0) {
          this.internalValue.splice(index, 1)
          this.$emit('input', this.internalValue)
        }
      },
    },
  }
</script>
