<template>
  <div class="ck-content" v-html="content" />
</template>

<script>
  export default {
    name: 'ParagraphView',
    props: {
      content: String,
    },
  }
</script>
