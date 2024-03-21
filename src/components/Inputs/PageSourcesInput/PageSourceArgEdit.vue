<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-select
          v-model="internalValue.type"
          :label="$t('components.admin.pageSources.arg.type')"
          :items="argTypes"
          :rules="[getRequiredRule()]"
        />
        <v-json-editor
          v-if="internalValue.type === 'json'"
          v-model="internalValue.value"
        />
        <v-text-field
          v-if="['param', 'string'].includes(internalValue.type)"
          v-model="internalValue.value"
          :label="$t('components.admin.pageSources.arg.value')"
        />
        <v-text-field
          v-model="internalValue.index"
          type="number"
          :label="$t('components.admin.pageSources.arg.index')"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" @click="onUpdate">
        {{ $t("components.admin.pageSources.submit") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import FormValidations from '../../../mixins/FormValidations'

  export default {
    name: 'PageSourceArgEdit',
    mixins: [
      FormValidations(),
    ],
    props: {
      title: String,
      value: Object,
    },
    data: vm => ({
      internalValue: { ...(vm.value ?? {}) },
      valid: false,
    }),
    computed: {
      argTypes () {
        return Object.entries(this.$t('components.admin.pageSources.arg.types')).map(e => ({
          text: e[1],
          value: e[0],
        }))
      },
    },
    watch: {
      value () {
        this.internalValue = { ...(this.value ?? {}) }
      },
    },
    methods: {
      onUpdate () {
        this.$refs.form.validate()

        if (this.valid) {
          this.$emit('input', this.internalValue)
        }
      },
    },
  }
</script>
