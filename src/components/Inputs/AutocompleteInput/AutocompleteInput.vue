<template>
  <v-autocomplete
    ref="autoInput"
    v-model="internalValue"
    v-bind="$props"
  >
    <template v-slot:prepend-item>
      <v-row no-gutters justify="center" align="center">
        <v-btn text @click="onSelectAll">
          {{ $t('components.admin.autocompleteInput.selectAll') }}
        </v-btn>
        <v-btn text @click="onSelectFiltered">
          {{ $t('components.admin.autocompleteInput.selectFiltered') }}
        </v-btn>
        <v-btn text @click="onSelectNone">
          {{ $t('components.admin.autocompleteInput.selectNone') }}
        </v-btn>
      </v-row>
      <v-divider />
    </template>
  </v-autocomplete>
</template>

<script>
  import { VAutocomplete } from 'vuetify/lib'

  export default {
    name: 'AutocompleteInput',
    mixins: [VAutocomplete],
    methods: {
      onSelectAll () {
        this.internalValue = this.allItems.map(it => it.value)
      },
      onSelectNone () {
        this.internalValue = []
      },
      onSelectFiltered () {
        this.internalValue = this.$refs.autoInput.filteredItems.map(it => it.value)
      },
    },
  }
</script>
