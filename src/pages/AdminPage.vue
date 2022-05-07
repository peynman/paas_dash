<template>
  <dashboard>
    <router-view />
  </dashboard>
</template>

<script>
  import Dashboard from '../templates/Dashboard/Dashboard.vue'

  export default {
    name: 'AdminPage',
    components: {
      Dashboard,
    },
  }
</script>
