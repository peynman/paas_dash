<template>
  <v-card>
    <v-card-title>
      {{
        showPageRemove ?
          $t('components.admin.dashboard.toolbar.updatePageTitle') :
          $t('components.admin.dashboard.toolbar.addPageTitle')
      }}
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="name"
          :disabled="showPageRemove"
          :label="$t('components.admin.dashboard.toolbar.pageName')"
          :rules="[ getRequiredRule() ]"
        />
        <v-text-field
          v-model="title"
          :label="$t('components.admin.dashboard.toolbar.pageTitle')"
          :rules="[ getRequiredRule() ]"
        />
        <icon-picker
          v-model="icon"
          :label="$t('components.admin.dashboard.toolbar.pageIcon')"
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn color="green" dark @click="onSubmit">
        {{
          showPageRemove ?
            $t('components.admin.dashboard.toolbar.updatePage') :
            $t('components.admin.dashboard.toolbar.addPage')
        }}
      </v-btn>
      <v-spacer />
      <confirm-remove-dialog v-if="showPageRemove" @remove="$emit('remove', name)">
        <template v-slot:activator="{on}">
          <v-btn color="red" dark text v-on="on">
            {{ $t('components.admin.dashboard.toolbar.removePage') }}
          </v-btn>
        </template>
      </confirm-remove-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
  import FormValidations from '../../mixins/FormValidations'
  import ConfirmRemoveDialog from '../Inputs/ConfirmDialog/ConfirmRemoveDialog.vue'
  import IconPicker from '../Inputs/IconPicker/IconPicker.vue'

  export default {
    name: 'DashboardPageEdit',
    components: {
      ConfirmRemoveDialog,
      IconPicker,
    },
    mixins: [
      FormValidations(),
    ],
    props: {
      value: Object,
      showPageRemove: Boolean,
    },
    data: vm => ({
      name: vm.value?.name,
      title: vm.value?.title,
      icon: vm.value?.icon,
      valid: false,
    }),
    watch: {
      value () {
        this.name = this.value?.name
        this.icon = this.value?.icon
        this.title = this.value?.title
        this.$refs.form.resetValidation()
      },
    },
    methods: {
      onSubmit () {
        this.$refs.form.validate()

        if (this.valid) {
          this.$emit('input', {
            name: this.name,
            icon: this.icon,
            title: this.title,
          })
        }
      },
    },
  }
</script>
