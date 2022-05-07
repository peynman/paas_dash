export default {
  name: 'ParagraphView',
  description: '',
  attributes: [
    {
      name: 'content',
      description: '',
      value: {
        kind: 'expression',
        type: 'custom',
      },
      tag: 'CKEditorInput',
      factory: () => import('../CKEditorInput/CKEditorInput.vue'),
    },
  ],
  events: [
  ],
  slots: [],
  'vue-model': {
  },
  factory: () => ({
    component: import('./ParagraphView.vue'),
  }),
}
