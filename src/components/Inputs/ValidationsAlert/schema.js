export default {
  name: 'ValidationsAlert',
  description: '',
  attributes: [
    {
      name: 'color',
      description: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'type',
      description: 'Validation type (success,warning,error,info)',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'message',
      description: 'Message to display',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'errors',
      description: '',
      default: '[]',
      value: {
        kind: 'expression',
        type: 'array',
      },
    },
  ],
  events: [],
  slots: [],
  'vue-model': {
    prop: 'value',
    event: 'input',
  },
  dynamic () {
    return import('./ValidationsAlert.vue')
  },
}
