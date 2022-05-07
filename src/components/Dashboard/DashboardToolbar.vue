<template>
  <v-toolbar extended elevation="1">
    <v-dialog v-model="showAddPage" max-width="766">
      <dashboard-page-edit
        v-model="pageData"
        :show-page-remove="showPageRemove"
        @input="onAddOrUpdatePage"
        @remove="onRemovePage"
      />
    </v-dialog>
    <v-toolbar-title>{{ $t('components.admin.dashboard.toolbar.title') }}</v-toolbar-title>
    <v-spacer />
    <v-btn icon color="green" @click="onShowAddNewPageDialog">
      <v-icon>mdi-plus-circle</v-icon>
    </v-btn>
    <template v-slot:extension>
      <v-tabs v-model="currPage" @change="onChangeTab">
        <v-tabs-slider />
        <v-tab v-for="(page, index) in pages" :key="`dash-page-${index}`">
          <v-btn x-small icon @click="onShowEditPage(page)"><v-icon x-small>mdi-pencil</v-icon></v-btn>
          <v-icon v-if="page.icon">{{ page.icon }}</v-icon>
          <span>{{ page.title }}</span>
        </v-tab>
      </v-tabs>
    </template>
  </v-toolbar>
</template>

<script>
  import DashboardPageEdit from './DashboardPageEdit.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'DashboardToolbar',
    components: {
      DashboardPageEdit,
    },
    props: {
      value: [Number, String],
    },
    data: vm => ({
      showAddPage: false,
      pageData: {},
      currPage: vm.value,
      showPageRemove: false,
    }),
    computed: {
      ...mapGetters('admin', [
        'pages',
      ]),
    },
    watch: {
      value () {
        this.currPage = this.value
      },
    },
    methods: {
      onShowAddNewPageDialog () {
        this.pageData = {}
        this.showAddPage = true
        this.showPageRemove = false
      },
      onShowEditPage (page) {
        this.pageData = page
        this.showPageRemove = true
        this.showAddPage = true
      },
      onAddOrUpdatePage (data) {
        this.showAddPage = false
        if (this.showPageRemove) {
          this.$store.commit('admin/updatePage', data)
        } else {
          this.$store.commit('admin/addPage', data)
        }
        this.pageData = {}
      },
      onRemovePage (name) {
        this.showAddPage = false
        this.$store.commit('admin/removePage', name)
      },
      onChangeTab () {
        console.log('tab')
        this.$emit('input', this.currPage)
      },
    },
  }
</script>
