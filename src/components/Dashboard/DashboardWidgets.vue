<template>
  <v-schema-renderer
    tag="VRow"
    class="mb-5"
    :children="schemaChildren"
    :components-dictionary="widgetsDictionary"
    :pre-processor="preProcessWidget"
  />
</template>

<script>
  import WidgetsRenderer from '../../mixins/WidgetsRenderer'
  import FormValidations from '../../mixins/FormValidations'
  import { getCrudResourceFolderFromName } from '../../utils/crud'

  export default {
    name: 'DashboardWidgets',
    mixins: [
      WidgetsRenderer,
      FormValidations(),
    ],
    props: {
      widgets: Array,
    },
    data: vm => ({
      schemaChildren: [],
    }),
    computed: {
      reportsDic () {
        return this.widgets?.reduce((dic, r) => {
          dic[r.name] = r
          return dic
        }, {})
      },
    },
    mounted () {
      this.loadWidgetsDesc()
    },
    methods: {
      loadWidgetsDesc () {
        if (this.widgets) {
          const promises = []
          this.widgets.forEach(w => {
            promises.push(import('../../crud/' + getCrudResourceFolderFromName(w.crud)))
          })
          Promise.all(promises).then(modules => {
            const mm = modules.map(m => m.default(this))
            const reports = []

            this.widgets.forEach(w => {
              const crud = mm.find(m => m.name === w.crud)
              if (crud && crud.reports) {
                reports.push(
                  ...(crud.reports.filter(r => this.reportsDic[r.name] && w.name === r.name)?.map(r => ({
                  ...r,
                  id: this.reportsDic[r.name].id,
                })) ?? [])
                )
              }
            })
            this.schemaChildren = this.getSchemaChildrenForWidgets(reports, {
              adminMode: true,
            })
          })
        }
      },
    },
  }
</script>
