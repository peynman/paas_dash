<template>
  <div class="d-flex flex-column justify-start">
    <strong>{{ titleString }}</strong>
    <v-chip small label class="mt-1">{{ nameString }}</v-chip>
  </div>
</template>

<script>
  import Decoratable from '../../mixins/Decoratable'

  export default {
    name: 'ObjectNameTitleColumn',
    mixins: [Decoratable],
    props: {
      value: Object,
      nameLabel: String,
      titleLabel: String,
      decorateMap: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      nameString () {
        return this.calculateLabel(this.nameLabel, this.decorateMap, this.value)
      },
      titleString () {
        return this.calculateLabel(this.titleLabel, this.decorateMap, this.value)
      },
    },
  }
</script>
