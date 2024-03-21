<template>
  <v-card>
    <v-card-title>{{ $t('components.admin.productCellarData.addTitle') }}</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="stock"
          :label="$t('components.admin.productCellarData.stockLabel')"
          :rules="[ getRequiredRule() ]"
          type="number"
        />
        <v-text-field
          v-model="size"
          :rules="[ getRequiredRule() ]"
          :label="$t('components.admin.productCellarData.sizeLabel')"
        />
        <v-color-picker-input
          v-model="color"
          :rules="[ getRequiredRule() ]"
          :label="$t('components.admin.productCellarData.colorLabel')"
        />
        <v-text-field
          v-model="name"
          :label="$t('components.admin.productCellarData.name')"
        />
        <v-text-field
          v-model="ref"
          :label="$t('components.admin.productCellarData.refrenceIdLabel')"
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn class="success" @click="addPhone">{{ $t('components.admin.productCellarData.add') }}</v-btn>
    </v-card-actions>  </v-card>
</template>

<script>
  import FormValidations from '../../../mixins/FormValidations'

  export default {
    name: 'EditCard',
    mixins: [
      FormValidations(),
    ],
    props: {
      value: Object,
    },
    data: vm => ({
      valid: true,
      stock: vm.value?.stock,
      size: vm.value?.size,
      color: vm.value?.color,
      name: vm.value?.name,
      ref: vm.value?.ref,
    }),
    watch: {
      value (n) {
        this.stock = this.value.stock
        this.size = this.value.size
        this.color = this.value.color
        this.name = this.value.name
        this.ref = this.value.ref
      },
    },
    methods: {
      addPhone () {
        this.$refs.form.validate()

        if (this.valid) {
          this.$emit('input', {
            stock: this.stock,
            color: this.color,
            size: this.size,
            ref: this.ref,
            name: this.name,
          })
          this.color = null
          this.stock = null
          this.size = null
          this.ref = null
          this.name = null
        }
      },
    },
  }
</script>
