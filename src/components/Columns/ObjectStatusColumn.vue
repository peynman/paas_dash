<template>
  <v-chip x-small label :color="statusColor">
    {{ statusString }}
  </v-chip>
</template>

<script>
  export default {
    name: 'ObjectStatusColumn',
    props: {
      items: Array,
      value: [String, Number],
    },
    computed: {
      statusString () {
        return this.items?.find(i => i.value === this.value)?.text
      },
      statusColor () {
        return this.items?.find(i => i.value === this.value)?.color
      },
    },
  }
</script>
