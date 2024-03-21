<template>
  <div class="d-flex flex-row justify-space-between align-center">
    <v-dialog max-width="766">
      <template v-slot:activator="{on}">
        <v-btn class="my-1" v-on="on">Template Theme</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span>Template Theme options</span>
          <v-spacer />
          <v-btn-toggle v-model="mode" mandatory dense>
            <v-btn>Light</v-btn>
            <v-btn>Dark</v-btn>
          </v-btn-toggle>
        </v-card-title>
        <v-card-text>
          <v-schema-renderer
            v-model="internalValue"
            :children="schemaChildren"
            @input="onEmitChanges"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-btn :color="previewModeColor" @click="onTogglePreview">{{ previewMode }}</v-btn>
  </div>
</template>

<script>
  import { flattenObject, expandObject } from '../../../utils/helpers'
  import Themeable from '../../../mixins/Themeable'

  export default {
    name: 'ThemeInput',
    mixins: [
      Themeable,
    ],
    props: {
      value: Object,
    },
    data: vm => ({
      internalValue: flattenObject(vm.value ?? {}, ''),
      mode: 0,
      preview: localStorage.getItem('theme-preview'),
    }),
    computed: {
      modeType () {
        return this.mode === 0 ? 'light' : 'dark'
      },
      schemaChildren () {
        return [this.getSchemaForObject(this.themeRoot[this.modeType], this.modeType, [])]
      },
      previewMode () {
        return this.preview ? 'Preview On' : 'Preview Off'
      },
      previewModeColor () {
        return this.preview ? 'success' : 'secondary'
      },
    },
    watch: {
      value () {
        this.internalValue = flattenObject(this.value ?? this.themeRoot, '')
      },
    },
    methods: {
      getSchemaForObject (obj, key, path) {
        return {
          tag: 'VExpansionPanels',
          props: {
            accordion: true,
          },
          children: this.getSchemaChildrenForObject(obj, key, path),
        }
      },
      getSchemaChildrenForObject (obj, key, path) {
        const innerItems = Object.keys(obj).filter(k => typeof obj[k] !== 'object').map(k => this.getSchemaForInput(obj[k], k, [...path, key]))
        return [
          ...Object.keys(obj).filter(k => typeof obj[k] === 'object').map(k => ({
            tag: 'VExpansionPanel',
            children: [
              {
                tag: 'VExpansionPanelHeader',
                children: k,
              },
              {
                tag: 'VExpansionPanelContent',
                children: this.getSchemaForKeysInObject(obj[k], k, [...path, key]),
              },
            ],
          })),
          ...(innerItems.length > 0 ? [
            {
              tag: 'VExpansionPanel',
              children: [
                {
                  tag: 'VExpansionPanelHeader',
                  children: key,
                },
                {
                  tag: 'VExpansionPanelContent',
                  children: innerItems,
                },
              ],
            },
          ] : []),
        ]
      },
      getSchemaForKeysInObject (obj, key, path) {
        return [
          this.getSchemaForObject(Object.keys(obj).filter(k => typeof obj[k] === 'object').reduce((nb, k) => ({ ...nb, [k]: obj[k] }), {}), key, path),
          ...Object.keys(obj).filter(k => typeof obj[k] !== 'object').map(k => this.getSchemaForInput(obj[k], k, [...path, key])),
        ]
      },
      getSchemaForInput (value, input, path) {
        if (input.endsWith('color')) {
          return {
            tag: 'VColorPickerInput',
            staticClass: 'my-3',
            props: {
              label: input,
              dense: true,
              hideDetails: true,
              value,
            },
            on: {
              input: (r, v) => {
                this.internalValue[[...path, input].join('.')] = v
                this.onEmitChanges()
              },
            },
          }
        } else if (typeof value === 'boolean') {
          return {
            tag: 'VCheckbox',
            props: {
              label: input,
              dense: true,
              hideDetails: true,
              value,
            },
            on: {
              change: (r, v) => {
                this.internalValue[[...path, input].join('.')] = v
                this.onEmitChanges()
              },
            },
          }
        } else {
          return {
            tag: 'VTextField',
            props: {
              label: input,
              type: typeof value === 'number' ? 'nmber' : 'text',
              dense: true,
              hideDetails: true,
              value,
            },
            on: {
              change: (r, v) => {
                this.internalValue[[...path, input].join('.')] = v
                this.onEmitChanges()
              },
            },
          }
        }
      },
      onTogglePreview () {
        if (this.preview) {
          this.preview = null
          localStorage.removeItem('theme-preview')
        } else {
          this.preview = expandObject(this.internalValue)
          localStorage.setItem('theme-preview', JSON.stringify(this.preview))
        }
      },
      onEmitChanges () {
        this.$emit('input', expandObject(this.internalValue))
      },
    },
  }
</script>
