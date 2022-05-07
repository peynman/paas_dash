<template>
  <v-text-field
    v-model="internalValue"
    :dark="dark"
    :light="light"
    :label="label"
    :disabled="disabled"
    :rules="rules"
    :error-messages="errorMessages"
  >
    <template v-slot:prepend-inner>
      <v-icon>{{ internalValue }}</v-icon>
    </template>
    <template v-slot:prepend>
      <v-menu
        :close-on-content-click="false"
        transition="scale-transition"
        rounded
        offset-y
      >
        <template v-slot:activator="{on}">
          <v-btn icon v-on="on"><v-icon>mdi-menu-down</v-icon></v-btn>
        </template>
        <v-card>
          <v-card-title>
            <v-tabs v-model="tab" center>
              <v-tabs-slider />
              <v-tab v-for="i in iconNames" :key="`icons-${i}`">{{ i }}</v-tab>
            </v-tabs>
          </v-card-title>
          <v-card-text>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="i in iconNames" :key="`icons-items-${i}`">
                <div class="d-flex flex-row flex-wrap">
                  <v-btn v-for="(ic, index) in icons[i]" :key="`icon-${ic}-${index}`" icon @click="onSetIcon(ic)">
                    <v-icon>{{ ic }}</v-icon>
                  </v-btn>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script>
  import Icons from './icons'

  export default {
    name: 'IconPicker',
    props: {
      dark: Boolean,
      light: Boolean,
      label: String,
      disabled: Boolean,
      rules: Array,
      errorMessages: Array,
      value: String,
    },
    data: vm => ({
      internalValue: vm.value,
      tab: 0,
    }),
    computed: {
      iconNames () {
        return Object.keys(Icons)
      },
      icons () {
        return this.iconNames.reduce((dic, icon) => {
          dic[icon] = Icons[icon].map(i => this.decodeIcon(i))
          return dic
        }, {})
      },
    },
    watch: {
      value () {
        this.internalValue = this.value
      },
    },
    methods: {
      onSetIcon (icon) {
        this.internalValue = icon
      },
      decodeIcon (icon) {
        const result = []
        let lastIndex = 0
        icon.split('').forEach((i, idx) => {
          if (i.match(/[A-Z]/g)) {
            result.push(icon.slice(lastIndex, idx))
            lastIndex = idx
          }
        })
        result.push(icon.slice(lastIndex))

        return result.join('-').toLowerCase()
      },
    },
  }
</script>
