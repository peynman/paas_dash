export default {
  name: 'ProductCellarInput',
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
      name: 'disabled',
      description: 'Disables the input',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'value',
      description: "The input's value",
      value: {
        kind: 'expression',
        type: 'any',
      },
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
      name: 'error-messages',
      description: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
      default: '[]',
      value: {
        kind: 'expression',
        type: [
          'string',
          'array',
        ],
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
    component: import('./ProductCellarInput.vue'),
  }),
}
