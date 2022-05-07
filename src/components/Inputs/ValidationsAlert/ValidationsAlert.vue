<template>
  <v-alert
    v-if="errors || message"
    :type="type"
    :color="color"
    dismissible
    text
    :elevation="elevation"
    border="bottom"
  >
    <div class="d-flex flex-column">
      <span>{{ message }}</span>
      <ul v-if="errors && errors.length > 0">
        <li v-for="(error, i) in errors" :key="`error-${i}`"><span class="caption">
          {{ error }}
        </span></li>
      </ul>
    </div>
  </v-alert>
</template>

<script>
  export default {
    name: 'ValidationAlert',
    props: {
      color: String,
      type: String,
      errors: [Array, String],
      message: String,
      elevation: String,
    },
  }
</script>
