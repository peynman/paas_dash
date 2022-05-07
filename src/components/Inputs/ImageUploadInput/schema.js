export default {
  name: 'ImageUploadInput',
  description: '',
  attributes: [
    {
      name: 'label',
      description: 'Sets input label',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'clearable',
      description: '',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'minImageScaling',
      description: 'cover or contain',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'maxImageScaling',
      description: '',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'number',
      },
    },
    {
      name: 'imageWidth',
      description: 'Sets the width of the image',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'number',
      },
    },
    {
      name: 'imageHeight',
      description: 'Sets the height of the image',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'number',
      },
    },
    {
      name: 'fullWidth',
      description: 'strech component to fill parents width',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'fullHeight',
      description: 'strech component to fill parents height',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'rules',
      description: 'Accepts a mixed array of types `function`, `boolean` and `string`. Functions pass an input value as an argument and must return either `true` / `false` or a `string` containing an error message. The input field will enter an error state if a function returns (or any value in the array contains) `false` or is a `string`',
      default: '[]',
      value: {
        kind: 'expression',
        type: 'array',
      },
    },
    {
      name: 'value',
      description: "The input's value",
      value: {
        kind: 'expression',
        type: 'any',
      },
    },
  ],
  events: [
    {
      name: 'input',
      description: 'The updated bound model',
      arguments: [
        {
          name: 'argument',
          type: 'any',
        },
      ],
    },
  ],
  slots: [],
  'vue-model': {
    prop: 'value',
    event: 'input',
  },
  factory: () => ({
    component: import('./ImageUploadInput.vue'),
  }),
}
