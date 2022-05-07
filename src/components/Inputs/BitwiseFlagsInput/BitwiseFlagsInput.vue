<template>
  <v-input
    :label="label"
    :value="value"
    :error-messages="errorMessages"
    :rules="rules"
    :vertical="true"
    :disabled="disabled"
  >
    <div class="d-flex flex-row flex-wrap justify-start align-start">
      <v-checkbox
        v-for="(item, index) in items"
        :key="`bitwiseflags-${index}`"
        v-model="flags[item.value]"
        class="me-3"
        :label="item.text"
      />
    </div>
  </v-input>
</template>

<script>
  export default {
    name: 'BitwiseFlagsInput',
    props: {
      label: String,
      items: Array,
      errorMessages: Array,
      rules: Array,
      disabled: Boolean,
      value: Number,
    },
    data: vm => ({
      flags: vm.items?.reduce((flags, item) => {
        if ((item.value & vm.value) !== 0) {
          flags[item.value] = true
        }
        return flags
      }, {}),
    }),
    watch: {
      value (n) {
        this.flags = this.items?.reduce((flags, item) => {
          if ((item.value & this.value) !== 0) {
            flags[item.value] = true
          }
          return flags
        }, {})
      },
      flags: {
        deep: true,
        handler (v) {
          let flags = 0
          Object.keys(v).forEach(k => {
            if (v[k]) {
              flags += parseInt(k)
            }
          })
          this.$emit('input', flags)
        },
      },
    },
  }
</script>
