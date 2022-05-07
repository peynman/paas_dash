<template>
  <div class="d-flex flex-column justify-start">
    <v-chip
      v-for="flag in flags"
      :key="`bitwiseflag-${flag.value}`"
      :color="flag.color"
      :dark="flag.dark"
      x-small
      label
      block
    >
      {{ flag.text }}
    </v-chip>
  </div>
</template>

<script>
  export default {
    name: 'BitwiseFlagsColumn',
    props: {
      items: Array,
      value: Number,
    },
    data: vm => ({
      flags: vm.items?.reduce((flags, item) => {
        if ((item.value & vm.value) !== 0) {
          flags.push(item)
        }
        return flags
      }, []),
    }),
  }
</script>
