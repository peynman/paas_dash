<template>
  <div>
    <validations-alert />
    <v-list>
      <div v-if="items && items.length > 0">
        <div v-for="(item, index) in items" :key="`paginated-item-${item.id}`">
          <slot name="item" :item="item" :index="index" />
        </div>
        <v-divider v-if="items && items.length < total" />
        <v-list-item v-if="items && items.length < total">
          <v-list-item-content class="d-flex flex-row justify-center align-center">
            <v-btn text small :loading="loading" @click="loadNextPage">{{ loadMoreText }}</v-btn>
          </v-list-item-content>
        </v-list-item>
      </div>
      <v-list-item v-else>
        <v-list-item-content>
          <v-progress-circular v-if="loading" indeterminate />
          <v-list-item-title v-else>{{ emptyText }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
  import ValidationsAlert from '../ValidationsAlert/ValidationsAlert.vue'
  import FormValidations from '@peynman/press-vue-core/mixins/FormValidations'
  import Themeable from '@peynman/press-vue-core/mixins/Themeable'

  export default {
    name: 'PaginatedList',
    components: { ValidationsAlert },
    mixins: [
      FormValidations(),
      Themeable,
    ],
    props: {
      loadPromise: Function,
      loadMoreText: String,
      emptyText: String,
    },
    data: vm => ({
      items: [],
      page: -1, // next page adds 1
      total: 0,
      loading: false,
    }),
    mounted () {
      this.loadNextPage()
    },
    methods: {
      loadNextPage () {
        this.loading = true
        this.loadPromise(this.page + 1)
          .then(json => {
            this.page = json.currPage
            this.total = json.total
            if (this.page === 1) {
              this.items = json.items
            } else {
              this.items.push(...json.items)
            }
            this.resetFormValidations()
          })
          .catch(err => {
            this.updateFormValidationErrors(err)
          })
          .finally(() => {
            this.loading = false
          })
      },
    },
  }
</script>
