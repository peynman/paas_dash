<template>
  <v-input
    :dark="dark"
    :light="light"
    :disabled="disabled"
    :label="label"
    :rules="rules"
    :error-messages="errorMessages"
    vertical
  >
    <template v-slot:prepend>
      <v-dialog max-width="766">
        <template v-slot:activator="{on}">
          <v-btn icon color="success" v-on="on"><v-icon>mdi-plus-circle</v-icon></v-btn>
        </template>
        <page-source-edit-card
          :title="$t('components.admin.pageSources.titleCreate')"
          :value="create"
          @input="onAddNewResource"
        />
      </v-dialog>
    </template>
    <v-simple-table class="fill-width">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="">
              {{ $t('components.admin.pageSources.resource') }}
            </th>
            <th class="">
              {{ $t('components.admin.pageSources.class') }}
            </th>
            <th class="">
              {{ $t('components.admin.pageSources.method') }}
            </th>
            <th class="">
              {{ $t('components.admin.pageSources.path') }}
            </th>
            <th class="">
              {{ $t('components.admin.pageSources.actions') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in internalValue"
            :key="`page-source-${index}`"
          >
            <td>{{ item.resource }}</td>
            <td>{{ item.class }}</td>
            <td>{{ item.method }}</td>
            <td>{{ item.path }}</td>
            <td>
              <v-dialog max-width="766">
                <template v-slot:activator="{on}">
                  <v-btn icon color="warning" v-on="on"><v-icon small>mdi-database-edit</v-icon></v-btn>
                </template>
                <page-source-edit-card
                  :value="item"
                  :title="$t('components.admin.pageSources.titleEdit')"
                  @input="onUpdateResource(index, $event)"
                />
              </v-dialog>
              <confirm-remove-dialog @remove="onRemove(index)">
                <template v-slot:activator="{on}">
                  <v-btn icon color="red" v-on="on"><v-icon small>mdi-database-remove</v-icon></v-btn>
                </template>
              </confirm-remove-dialog>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-input>
</template>

<script>
  import PageSourceEditCard from './PageSourceEditCard.vue'
  import ConfirmRemoveDialog from '../ConfirmDialog/ConfirmRemoveDialog.vue'

  export default {
    name: 'PageSourceInout',
    components: {
      PageSourceEditCard,
      ConfirmRemoveDialog,
    },
    props: {
      dark: Boolean,
      light: Boolean,
      disabled: Boolean,
      label: String,
      errorMessages: Array,
      rules: Array,
      value: Array,
    },
    data: vm => ({
      internalValue: vm.value ?? [],
      create: {},
    }),
    watch: {
      value () {
        this.internalValue = this.value ?? []
      },
    },
    methods: {
      onAddNewResource (r) {
        this.internalValue.push(r)
        this.create = {}
        this.$emit('input', this.internalValue)
      },
      onUpdateResource (index, r) {
        this.$set(this.internalValue, index, r)
        this.$emit('input', this.internalValue)
      },
      onRemove (index) {
        this.internalValue.splice(index, 1)
        this.$emit('input', this.internalValue)
      },
    },
  }
</script>
