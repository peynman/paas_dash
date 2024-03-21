<template>
  <v-col cols="4" />
</template>

<script>
  import FormValidations from '../mixins/FormValidations'
  import InputType from '../components/Inputs/SchemaType'
  import { imageUploadProperty } from '../utils/schemaHelpers'

  export default {
    name: 'Playground',
    mixins: [
      FormValidations(),
    ],
    data: vm => ({
      sources: [],
      cats: [],
      schema: null,
      extras: [
        ...InputType,
      ],
      product: { id: 7, author_id: 1, parent_id: null, name: 'giv-1020031', group: null, data: { title: 'دورس NIKE F.C', fixedPrice: { amount: 750000, currency: 1 }, quantized: true, types: { cellar: { inventory: [{ stock: 2, color: '#000000', name: 'مشکی', ref: 1, size: 'L', itemId: 12164001102, parentId: 12164 }, { stock: 1, color: '#000000', name: 'مشکی', ref: 1, size: 'M', itemId: 12164001101, parentId: 12164 }, { stock: 3, color: '#000000', name: 'مشکی', ref: 1, size: 'XL', itemId: 12164001103, parentId: 12164 }, { stock: 3, color: '#000000', name: 'مشکی', ref: 1, size: 'XXL', itemId: 12164001104, parentId: 12164 }, { stock: 2, color: '#FFFFFF', name: 'سفید', ref: 2, size: 'L', itemId: 12164002102, parentId: 12164 }, { stock: 0, color: '#FFFFFF', name: 'سفید', ref: 2, size: 'M', itemId: 12164002101, parentId: 12164 }, { stock: 2, color: '#FFFFFF', name: 'سفید', ref: 2, size: 'XL', itemId: 12164002103, parentId: 12164 }, { stock: 2, color: '#FFFFFF', name: 'سفید', ref: 2, size: 'XXL', itemId: 12164002104, parentId: 12164 }, { stock: 1, color: '#08400', name: 'سبز', ref: 12, size: 'L', itemId: 12164012102, parentId: 12164 }, { stock: 1, color: '#08400', name: 'سبز', ref: 12, size: 'M', itemId: 12164012101, parentId: 12164 }, { stock: 0, color: '#08400', name: 'سبز', ref: 12, size: 'XL', itemId: 12164012103, parentId: 12164 }, { stock: 1, color: '#08400', name: 'سبز', ref: 12, size: 'XXL', itemId: 12164012104, parentId: 12164 }, { stock: 1, color: '#8F8F8F', name: 'طوسی ملانژ', ref: 20, size: 'L', itemId: 12164020102, parentId: 12164 }, { stock: 1, color: '#8F8F8F', name: 'طوسی ملانژ', ref: 20, size: 'M', itemId: 12164020101, parentId: 12164 }, { stock: 1, color: '#8F8F8F', name: 'طوسی ملانژ', ref: 20, size: 'XL', itemId: 12164020103, parentId: 12164 }, { stock: 1, color: '#8F8F8F', name: 'طوسی ملانژ', ref: 20, size: 'XXL', itemId: 12164020104, parentId: 12164 }] }, images: { slides: [{ image: '/storage/images/product-images/gAHKPqmoqS.jpg', width: 2766, height: 3457, ref: 0, aspect: 0.8001157072606306, fileId: 18, index: 2 }, { image: '/storage/images/product-images/DlMpnCvCBS.jpg', width: 2691, height: 3364, ref: 12, aspect: 0.7999405469678954, fileId: 19, index: 3 }, { image: '/storage/images/product-images/qbuwHJZeMj.jpg', width: 2718, height: 3397, ref: 2, aspect: 0.8001177509567265, fileId: 20, index: 4 }, { image: '/storage/images/product-images/ehwYkUbONY.jpg', width: 2808, height: 3510, ref: 20, aspect: 0.8, fileId: 21, index: 5 }, { image: '/storage/images/product-images/ZmdumGdjBD.jpg', width: 2766, height: 3457, ref: 1, aspect: 0.8001157072606306, fileId: 22, index: 6 }] } } }, priority: 0, flags: 0, publish_at: null, expires_at: null, created_at: '2021-10-28T15:37:12.000000Z', updated_at: '2021-10-28T15:37:12.000000Z', deleted_at: null, categories: [{ id: 52, author_id: 1, parent_id: 48, name: 'giv-130101', data: { title: 'دورس', order: 0, showOnProductCard: 1, isFilterable: 1, showInFrontFilters: 1, queryFrontEnd: 1, giv: { code: 130101, active: 1, virtualSale: 1 } }, flags: 0, created_at: '2021-10-28T15:30:37.000000Z', updated_at: '2021-10-28T15:30:37.000000Z', deleted_at: null, pivot: { product_id: 7, product_category_id: 52 } }, { id: 48, author_id: 1, parent_id: null, name: 'giv-1301', data: { title: 'پوشاک', order: 0, showOnProductCard: 1, isFilterable: 1, showInFrontFilters: 1, queryFrontEnd: 1, giv: { code: 1301, active: 1, virtualSale: 1 } }, flags: 0, created_at: '2021-10-28T15:30:37.000000Z', updated_at: '2021-10-28T15:30:37.000000Z', deleted_at: null, pivot: { product_id: 7, product_category_id: 48 } }], types: [{ id: 1, author_id: 1, name: 'cellar', data: { title: 'کالای انبار', content: { id: 'root', tag: 'VSchemaRenderer', props: { bindings: [] }, children: [{ tag: 'ProductCellarInput', id: 'inventory', slot: 'default', parent: null, children: [], 'v-model': '$(bindings.inventory)', props: { label: 'موجودی' } }, { tag: 'CKEditorInput', id: 'guide', slot: 'default', parent: null, children: [], props: { label: 'توضیحات بخش راهنمای سایز' }, 'v-model': '$(bindings.guide)' }] } }, flags: 0, created_at: '2021-10-16T12:19:57.000000Z', updated_at: '2021-10-16T12:19:57.000000Z', deleted_at: null, pivot: { product_id: 7, product_type_id: 1 } }, { id: 2, author_id: 1, name: 'images', data: { content: { tag: 'VSchemaRenderer', props: { bindings: [] }, children: [{ tag: 'ProductImagesInput', id: 'headers', slot: 'default', parent: null, children: [], 'v-model': '$(bindings.headers)', props: { label: 'عکس‌های بالای صفحه' } }, { tag: 'ProductImagesInput', id: 'slides', slot: 'default', parent: null, children: [], 'v-model': '$(bindings.slides)', props: { label: 'عکس‌های محصول' } }] }, title: 'محصول با عکس' }, flags: 0, created_at: '2021-10-16T12:19:57.000000Z', updated_at: '2021-10-16T12:19:57.000000Z', deleted_at: null, pivot: { product_id: 7, product_type_id: 2 } }, { id: 3, author_id: 1, name: 'descriptive', data: { content: { id: 'root', tag: 'VSchemaRenderer', props: { bindings: [] }, children: [{ tag: 'CKEditorInput', id: 'content', slot: 'default', parent: null, children: [], props: { label: 'توضیحات محصول در صفحه' }, 'v-model': '$(bindings.content)' }, { tag: 'VSchemaBuilder', id: 'schema', slot: 'default', parent: null, children: [], props: { label: 'محتوای اضافی در صفحه محصول' }, 'v-model': '$(bindings.schema)' }] }, title: 'دارای محتوا' }, flags: 0, created_at: '2021-10-16T12:19:57.000000Z', updated_at: '2021-10-16T12:19:57.000000Z', deleted_at: null, pivot: { product_id: 7, product_type_id: 3 } }] },
      childs: [
        {
          tag: 'VSchemaBuilder',
          props: {
            extraTypes: [
              ...InputType,
            ],
            customPropertyResolver: imageUploadProperty,
            value: {
              tag: 'VSchemaRenderer',
              children: [
                {
                  tag: 'VImg',
                },
              ],
            },
          },
        },
      ],
    }),
  }
</script>
