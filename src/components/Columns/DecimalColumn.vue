<template>
  <span>
    {{ label }}
  </span>
</template>

<script>
  export default {
    name: 'DecimalColumn',
    props: {
      value: [Number, String],
    },
    computed: {
      label () {
        return this.$n(this.value, 'decimal')
      },
    },
  }
</script>
