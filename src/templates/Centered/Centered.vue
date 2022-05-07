<template>
  <v-main class="d-flex justify-center align-center strip-back" :style="styles">
    <v-container>
      <slot />
    </v-container>
  </v-main>
</template>

<script>
  export default {
    name: 'TCentered',
    props: {
      color: String,
    },
    computed: {
      styles () {
        return {
          backgroundColor: this.color,
        }
      },
    },
  }
</script>
