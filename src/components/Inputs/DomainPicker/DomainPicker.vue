<template>
  <v-input
    :label="label"
    :loading="loading"
    :value="value"
    :vertical="true"
    :error-messages="errorMessages"
    :disabled="disabled"
    :rules="rules"
  >
    <template v-slot:prepend>
      <v-dialog>
        <template v-slot:activator="{on}">
          <v-btn icon color="success" v-on="on"><v-icon>mdi-plus-box</v-icon></v-btn>
        </template>
        <edit-card :domains="domains" :loading="loading" :flag-items="flagItems" @input="onAddDomain" />
      </v-dialog>
    </template>
    <v-list dnese two-line>
      <div v-for="d in internalValue" :key="`domain-${d.id}`">
        <domain-display
          :domain="d"
          :get-active-flags="getActiveFlags"
          @remove="onRemoveDomain"
          @update="onUpdateDomain"
        />
        <v-divider />
      </div>
    </v-list>
  </v-input>
</template>

<script>
  import DomainDisplay from './DomainDisplay.vue'
  import EditCard from './EditCard.vue'

  export default {
    name: 'DomainPicker',
    components: { EditCard, DomainDisplay },
    props: {
      label: String,
      errorMessages: Array,
      loading: Boolean,
      rules: Array,
      domains: Array,
      disabled: Boolean,
      value: {
        type: Array,
        default: () => ([]),
      },
    },
    data: vm => ({
      valid: true,
      internalValue: vm.value ?? [],
    }),
    computed: {
      flagNumbers () {
        return [1, 2, 4, 8]
      },
      flagItems () {
        return this.flagNumbers.map(flag => ({
          text: this.getFlagText(flag),
          value: flag,
        }))
      },
      getActiveFlags () {
        return d => {
          const actives = []

          if (d.pivot?.flags) {
            this.flagNumbers.forEach(n => {
              if ((n & d.pivot.flags) !== 0) {
                actives.push(this.getFlagText(n))
              }
            })
          }

          return actives
        }
      },
    },
    watch: {
      value () {
        this.internalValue = this.value ?? []
      },
    },
    methods: {
      getFlagText (flag) {
        return this.$t(`components.admin.domainPicker.flags.${flag}`)
      },
      onAddDomain (domain) {
        this.internalValue.push(domain)
        this.$emit('input', this.internalValue)
      },
      onUpdateDomain (n, o) {
        const index = this.internalValue.indexOf(o)
        if (index >= 0) {
          this.$set(this.internalValue, index, n)
          this.$emit('input', this.internalValue)
        }
      },
      onRemoveDomain (d) {
        const index = this.internalValue.indexOf(d)
        if (index >= 0) {
          this.internalValue.splice(index, 1)
          this.$emit('input', this.internalValue)
        }
      },
    },
  }
</script>
