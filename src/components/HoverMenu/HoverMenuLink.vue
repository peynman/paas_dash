<template>
  <v-btn
    v-if="modeBtn"
    text
    small
    :to="link.to"
    :href="link.href"
    :target="link.target"
    :active-class="link.activeClass"
    style="position: relative;"
  >
    <v-icon v-if="link.icon" class="me-1" small>{{ link.icon }}</v-icon>
    {{ link.title }}
  </v-btn>
  <v-list-item
    v-else
    :to="link.to"
    :href="link.href"
    :target="link.target"
  >
    <v-list-item-avatar v-if="link.icon">
      <v-icon small>{{ cc.icon }}</v-icon>
    </v-list-item-avatar>
    <v-list-item-title>
      {{ link.title }}
    </v-list-item-title>
    <v-list-item-action
      v-if="link.children && link.children.length > 0"
      class="d-flex flex-row justify-end align-center"
    >
      <v-icon small>mdi-chevron-left</v-icon>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
  export default {
    name: 'HoverMenuLink',
    props: {
      link: Object,
      modeBtn: Boolean,
    },
  }
</script>
