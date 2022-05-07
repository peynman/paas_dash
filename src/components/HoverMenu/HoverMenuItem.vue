<template>
  <v-hover
    v-if="link.children && link.children.length > 0"
    v-slot:default="{hover}"
  >
    <div>
      <hover-menu-link :mode-btn="modeBtn" :link="link" />
      <v-list
        v-if="hover"
        desnse
        dense
        class="p-absolute pa-0"
        elevation="3"
        :style="style"
      >
        <div
          v-for="(cc, ii) in link.children"
          :key="`appbar-submenu-${ii}`"
          style="position: relative;"
        >
          <hover-menu-item subset :link="cc" />
        </div>
      </v-list>
    </div>
  </v-hover>
  <hover-menu-link v-else :mode-btn="modeBtn" :link="link" />
</template>

<script>
  import HoverMenuLink from './HoverMenuLink.vue'

  export default {
    name: 'HoverMenuItem',
    components: {
      HoverMenuLink,
    },
    props: {
      link: Object,
      modeBtn: Boolean,
      subset: Boolean,
    },
    computed: {
      style () {
        if (this.subset) {
          return 'position:absolute; right: 100%; top: 0;'
        }

        return null
      },
    },
  }
</script>
