<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-select
          v-model="internalValue.resource"
          :label="$t('components.admin.pageSources.resource')"
          :items="resources"
          :rules="[getRequiredRule()]"
        />
        <v-select
          v-if="internalValue.resource === 'repository'"
          v-model="internalValue.class"
          :label="$t('components.admin.pageSources.class')"
          :items="classes"
          :rules="[getRequiredRule()]"
        />
        <v-text-field
          v-if="internalValue.resource === 'object'"
          v-model="internalValue.class"
          :label="$t('components.admin.pageSources.class')"
          :rules="[getRequiredRule()]"
        />
        <v-select
          v-if="internalValue.resource === 'repository'"
          v-model="internalValue.method"
          :label="$t('components.admin.pageSources.method')"
          :items="methods"
          :rules="[getRequiredRule()]"
        />
        <v-text-field
          v-model="internalValue.path"
          :label="$t('components.admin.pageSources.path')"
          :rules="[getRequiredRule()]"
        />
        <page-source-args-list
          v-if="internalValue.resource === 'repository'"
          v-model="internalValue.args"
          class="mt-2"
          :label="$t('components.admin.pageSources.args')"
          :items="methods"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" @click="onUpdate">
        {{ $t("components.admin.pageSources.submit") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import FormValidations from '@peynman/press-vue-core/mixins/FormValidations'
  import PageSourceArgsList from './PageSourceArgsList.vue'
  import Repos from './repos'

  export default {
    name: 'PageSourceEditCard',
    components: {
      PageSourceArgsList,
    },
    mixins: [
      FormValidations(),
    ],
    props: {
      title: String,
      value: Object,
    },
    data: vm => ({
      internalValue: { ...(vm.value ?? {}) },
      valid: false,
    }),
    computed: {
      resources () {
        return [
          {
            text: 'Object',
            value: 'object',
          },
          {
            text: 'Repository',
            value: 'repository',
          },
        ]
      },
      classes () {
        return Object.keys(Repos).map(c => ({
          text: c,
          value: Repos[c].class,
        }))
      },
      methods () {
        if (!this.internalValue?.class) {
          return []
        }

        const classShortName = this.classes.find(
          c => c.value === this.internalValue?.class
        )?.text
        if (classShortName) {
          const methods = Repos[classShortName].methods ?? []
          return methods.map(m => ({
            value: m.name,
            text: m.name,
          }))
        }

        return []
      },
    },
    watch: {
      value () {
        this.internalValue = { ...(this.value ?? {}) }
      },
    },
    methods: {
      onUpdate () {
        this.$refs.form.validate()

        if (this.valid) {
          this.$emit('input', this.internalValue)
        }
      },
    },
  }
</script>
