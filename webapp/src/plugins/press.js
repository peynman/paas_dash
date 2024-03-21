import Vue from 'vue'
import PressCore from '@peynman/press-vue-admin'
import AdminComponentsDictionary from '@peynman/press-vue-admin/components/admin-schemas'
import CKEditorSchema from '@peynman/press-vue-admin/components/Inputs/CKEditorInput/schema.js'
import ParagraphView from '@peynman/press-vue-admin/components/Inputs/ParagraphView/schema.js'
import WebTypes from './webTypes'

import CartStatusList from '../../../src/crud/Cart/status'

export const SchemasDictionary = {
  ...AdminComponentsDictionary,
}

export const BuilderDictionary = [
  CKEditorSchema,
  ParagraphView,
  ...WebTypes.contributions.html.tags,
].reduce((dic, i) => {
  dic[i.name] = i
  return dic
}, {})

export default $store => (new PressCore(Vue, {
  store: $store,
  schemaTypesDictionary: $component => (SchemasDictionary),
  builderTypesDictionary: $component => (BuilderDictionary),
  crudImportCallback: crud => import('../../../src/crud/' + crud),
  cartStatusList: $component => CartStatusList($component),
  chatRoomTypeList: $component => Object.entries($component.$t('component.website.chat.types')).map(e => ({
    text: e[1],
    value: e[0],
  })),
  deliveryAgentList: $component => Object.entries($component.$t('components.website.userCart.agents')).map(e => ({
    text: e[1],
    value: e[0],
    hint: $component.$t('components.website.userCart.agentHints.' + e[0]),
  })),
  importAsyncComponentCallback: name => {
    return SchemasDictionary[name]?.().component
  },
  getCKEditor ($component) {
    return require('./ckeditor/ckeditor')
  },
  getCKEditorConfig ($component) {
    return {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'fontFamily',
          'fontSize',
          'fontColor',
          'fontBackgroundColor',
          'removeFormat',
          '|',
          'alignment',
          'outdent',
          'indent',
          '|',
          'imageUpload',
          'imageInsert',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo',
          '|',
          'sourceEditing',
        ],
      },
      language: 'en-gb',
      image: {
        toolbar: [
          'imageTextAlternative',
          'imageStyle:inline',
          'imageStyle:block',
          'imageStyle:side',
          'linkImage',
        ],
      },
      mediaEmbed: {
        toolbar: [],
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells',
        ],
      },
    }
  },
  getCKEditorImageAdapter ($component) {
    return require('./ckeditor/ImageUploadAdapter.js').default
  },
}))
