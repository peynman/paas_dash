export default {
  name: 'PageSourcesInput',
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
    component: import('./PageSourcesInput.vue'),
  }),
}
