<template>
  <v-input
    :label="label"
    :value="value"
    :error-messages="errorMessages"
    :rules="rules"
    :vertical="true"
    :disabled="disabled"
  >
    <template v-slot:prepend>
      <v-dialog>
        <template v-slot:activator="{on}">
          <v-btn color="success" icon v-on="on"><v-icon>mdi-plus-box</v-icon></v-btn>
        </template>
        <edit-card :item-flags="itemFlags" @input="onAddNewPhoneNumber" />
      </v-dialog>
    </template>
    <v-list dense two-line>
      <div v-for="(phone, index) in internalValue" :key="`phone-${index}`" class="d-flex flex-column">
        <phone-number-display
          :item-flags="itemFlags"
          :get-active-flags="getPhoneActiveFlags"
          :phone="phone"
          @update="onUpdatePhone"
          @remove="onRemovePhone"
        />
        <v-divider />
      </div>
    </v-list>
  </v-input>
</template>

<script>
  import EditCard from './EditCard.vue'
  import PhoneNumberDisplay from './PhoneNumberDisplay.vue'

  export default {
    name: 'PhoneNumberInput',
    components: {
      EditCard,
      PhoneNumberDisplay,
    },
    props: {
      label: String,
      rules: Array,
      errorMessages: Array,
      value: Array,
      disabled: Boolean,
      default: () => ([]),
    },
    data: vm => ({
      internalValue: vm.value ?? [],
    }),
    computed: {
      getPhoneActiveFlags () {
        return d => {
          const actives = []

          if (d.flags) {
            this.flagNumbers.forEach(n => {
              if ((n & d.flags) !== 0) {
                actives.push(this.getFlagText(n))
              }
            })
          }

          return actives
        }
      },
      flagNumbers () {
        return [1, 2]
      },
      itemFlags () {
        return this.flagNumbers.map(flag => ({
          text: this.getFlagText(flag),
          value: flag,
        }))
      },
    },
    watch: {
      value () {
        this.internalValue = this.value ?? []
      },
      internalValue: {
        deep: true,
        handler () {
          this.$emit('input', this.internalValue)
        },
      },
    },
    methods: {
      getFlagText (flag) {
        return this.$t(`components.admin.phoneNumber.flags.${flag}`)
      },
      onAddNewPhoneNumber (p) {
        this.internalValue.push(p)
      },
      onRemovePhone (d) {
        const index = this.internalValue.indexOf(d)
        if (index >= 0) {
          this.internalValue.splice(index, 1)
        }
      },
      onUpdatePhone (n, o) {
        const index = this.internalValue.indexOf(o)
        if (index >= 0) {
          this.$set(this.internalValue, index, n)
        }
        this.editDialog = false
      },
    },
  }
</script>
