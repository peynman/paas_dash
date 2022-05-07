export default {
  name: 'AutocompleteInput',
  description: '',
  attributes: [
    {
      name: 'allow-overflow',
      description: 'Allow the menu to overflow off the screen',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'true',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'append-icon',
      description: 'Appends an icon to the component, uses the same syntax as `v-icon`',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: "'$dropdown'",
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'append-outer-icon',
      description: "Appends an icon to the outside the component's input, uses same syntax as `v-icon`",
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'attach',
      description: 'Specifies which DOM element that this component should detach to. String can be any valid querySelector and Object can be any valid Node. This will attach to the root `v-app` component by default.',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'any',
      },
    },
    {
      name: 'auto-select-first',
      description: 'When searching, will always highlight the first option',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'autofocus',
      description: 'Enables autofocus',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'background-color',
      description: 'Changes the background-color of the input',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'cache-items',
      description: 'Keeps a local _unique_ copy of all items that have been passed through the **items** prop.',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'chips',
      description: 'Changes display of selections to chips',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'clear-icon',
      description: 'Applied when using **clearable** and the input is dirty',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: "'$clear'",
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'clearable',
      description: 'Add input clear functionality, default icon is Material Design Icons **mdi-clear**',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'color',
      description: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'counter',
      description: 'Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation.',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: [
          'boolean',
          'number',
          'string',
        ],
      },
    },
    {
      name: 'counter-value',
      description: '',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'null',
      value: {
        kind: 'expression',
        type: 'function',
      },
    },
    {
      name: 'dark',
      description: "Applies the dark theme variant to the component. This will default the components color to _white_ unless you've configured your [application theme](/customization/theme) to **dark** or if you are using the **color** prop on the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).",
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'deletable-chips',
      description: 'Adds a remove icon to selected chips',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'dense',
      description: 'Reduces the input height',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'disable-lookup',
      description: 'Disables keyboard lookup',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'disabled',
      description: 'Disables the input',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'eager',
      description: 'Will force the components content to render on mounted. This is useful if you have content that will not be rendered in the DOM that you want crawled for SEO.',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'error',
      description: 'Puts the input in a manual error state',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'error-count',
      description: 'The total number of errors that should display at once',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: '1',
      value: {
        kind: 'expression',
        type: [
          'number',
          'string',
        ],
      },
    },
    {
      name: 'error-messages',
      description: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: '[]',
      value: {
        kind: 'expression',
        type: [
          'string',
          'array',
        ],
      },
    },
    {
      name: 'filled',
      description: 'Applies the alternate filled input style',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'filter',
      description: 'The filtering algorithm used when searching. [example](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VAutocomplete/VAutocomplete.ts#L40)',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: '(item, queryText, itemText) => {}',
      value: {
        kind: 'expression',
        type: 'function',
      },
    },
    {
      name: 'flat',
      description: 'Removes elevation (shadow) added to element when using the **solo** or **solo-inverted** props',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'full-width',
      description: 'Designates input type as full-width',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'height',
      description: 'Sets the height of the input',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: [
          'number',
          'string',
        ],
      },
    },
    {
      name: 'hide-details',
      description: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: [
          'boolean',
          'string',
        ],
      },
    },
    {
      name: 'hide-no-data',
      description: 'Hides the menu when there are no options to show.  Useful for preventing the menu from opening before results are fetched asynchronously.  Also has the effect of opening the menu when the `items` array changes if not already open.',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'hide-selected',
      description: 'Do not display in the select menu items that are already selected',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'hint',
      description: 'Hint text',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'id',
      description: 'Sets the DOM id on the component',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'item-color',
      description: 'Sets color of selected items',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: "'primary'",
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'item-disabled',
      description: "Set property of **items**'s disabled value",
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'disabled',
      value: {
        kind: 'expression',
        type: [
          'string',
          'array',
          'function',
        ],
      },
    },
    {
      name: 'item-text',
      description: "Set property of **items**'s text value",
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'text',
      value: {
        kind: 'expression',
        type: [
          'string',
          'array',
          'function',
        ],
      },
    },
    {
      name: 'item-value',
      description: "Set property of **items**'s value - **must be primitive**. Dot notation is supported. **Note:** This is currently not supported with `v-combobox` [GitHub Issue](https://github.com/vuetifyjs/vuetify/issues/5479)",
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'value',
      value: {
        kind: 'expression',
        type: [
          'string',
          'array',
          'function',
        ],
      },
    },
    {
      name: 'items',
      description: 'Can be an array of objects or array of strings. When using objects, will look for a text, value and disabled keys. This can be changed using the **item-text**, **item-value** and **item-disabled** props.  Objects that have a **header** or **divider** property are considered special cases and generate a list header or divider; these items are not selectable.',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: '[]',
      value: {
        kind: 'expression',
        type: 'array',
      },
    },
    {
      name: 'label',
      description: 'Sets input label',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'light',
      description: 'Applies the light theme variant to the component.',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'loader-height',
      description: 'Specifies the height of the loader',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: '2',
      value: {
        kind: 'expression',
        type: [
          'number',
          'string',
        ],
      },
    },
    {
      name: 'loading',
      description: "Displays linear progress bar. Can either be a String which specifies which color is applied to the progress bar (any material color or theme color - **primary**, **secondary**, **success**, **info**, **warning**, **error**) or a Boolean which uses the component **color** (set by color prop - if it's supported by the component) or the primary color",
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: [
          'boolean',
          'string',
        ],
      },
    },
    {
      name: 'menu-props',
      description: 'Pass props through to the `v-menu` component. Accepts either a string for boolean props `menu-props="auto, overflowY"`, or an object `:menu-props="{ auto: true, overflowY: true }"`',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: '{\n  closeOnClick: false,\n  closeOnContentClick: false,\n  disableKeys: true,\n  openOnClick: false,\n  maxHeight: 304,\n  offsetY: true,\n  offsetOverflow: true,\n  transition: false\n}',
      value: {
        kind: 'expression',
        type: [
          'string',
          'array',
          'object',
        ],
      },
    },
    {
      name: 'messages',
      description: 'Displays a list of messages or message if using a string',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: '[]',
      value: {
        kind: 'expression',
        type: [
          'string',
          'array',
        ],
      },
    },
    {
      name: 'multiple',
      description: 'Changes select to multiple. Accepts array for value',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'no-data-text',
      description: 'Display text when there is no data',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: "'$vuetify.noDataText'",
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'no-filter',
      description: 'Do not apply filtering when searching. Useful when data is being filtered server side',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'open-on-clear',
      description: 'When using the **clearable** prop, once cleared, the select menu will either open or stay open, depending on the current state',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'outlined',
      description: 'Applies the outlined style to the input',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'persistent-hint',
      description: 'Forces hint to always be visible',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'persistent-placeholder',
      description: 'Forces placeholder to always be visible',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'placeholder',
      description: "Sets the input's placeholder text",
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'prefix',
      description: 'Displays prefix text',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'prepend-icon',
      description: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'prepend-inner-icon',
      description: "Prepends an icon inside the component's input, uses the same syntax as `v-icon`",
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'readonly',
      description: 'Puts input in readonly state',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'return-object',
      description: 'Changes the selection behavior to return the object directly rather than the value specified with **item-value**',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'reverse',
      description: 'Reverses the input orientation',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'rounded',
      description: 'Adds a border radius to the input',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
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
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: '[]',
      value: {
        kind: 'expression',
        type: 'array',
      },
    },
    {
      name: 'search-input',
      description: 'Search value. Can be used with `.sync` modifier.',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'shaped',
      description: 'Round if `outlined` and increase `border-radius` if `filled`. Must be used with either `outlined` or `filled`',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'single-line',
      description: 'Label does not move on focus/dirty',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'small-chips',
      description: 'Changes display of selections to chips with the **small** property',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'solo',
      description: 'Changes the style of the input',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'solo-inverted',
      description: 'Reduces element opacity until focused',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'success',
      description: 'Puts the input in a manual success state',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
    {
      name: 'success-messages',
      description: 'Puts the input in a success state and passes through custom success messages.',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: '[]',
      value: {
        kind: 'expression',
        type: [
          'string',
          'array',
        ],
      },
    },
    {
      name: 'suffix',
      description: 'Displays suffix text',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'undefined',
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'type',
      description: 'Sets input type',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: "'text'",
      value: {
        kind: 'expression',
        type: 'string',
      },
    },
    {
      name: 'validate-on-blur',
      description: 'Delays validation until blur event',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
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
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      value: {
        kind: 'expression',
        type: 'any',
      },
    },
    {
      name: 'value-comparator',
      description: 'The comparison algorithm used for values. [More info](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/helpers.ts)',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: '(a: any, b: any): boolean',
      value: {
        kind: 'expression',
        type: 'function',
      },
    },
    {
      name: 'vertical',
      description: '',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#props',
      default: 'false',
      value: {
        kind: 'expression',
        type: 'boolean',
      },
      type: 'boolean',
    },
  ],
  events: [
    {
      name: 'blur',
      description: 'Emitted when the input is blurred',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'Event',
        },
      ],
    },
    {
      name: 'change',
      description: 'Emitted when the input is changed by user interaction',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'any',
        },
      ],
    },
    {
      name: 'click',
      description: 'Emitted when input is clicked',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'MouseEvent',
        },
      ],
    },
    {
      name: 'click:append',
      description: 'Emitted when appended icon is clicked',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'Event',
        },
      ],
    },
    {
      name: 'click:append-outer',
      description: 'Emitted when appended outer icon is clicked',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'Event',
        },
      ],
    },
    {
      name: 'click:clear',
      description: 'Emitted when clearable icon clicked',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'Event',
        },
      ],
    },
    {
      name: 'click:prepend',
      description: 'Emitted when prepended icon is clicked',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'Event',
        },
      ],
    },
    {
      name: 'click:prepend-inner',
      description: 'Emitted when prepended inner icon is clicked',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'Event',
        },
      ],
    },
    {
      name: 'focus',
      description: 'Emitted when component is focused',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'Event',
        },
      ],
    },
    {
      name: 'input',
      description: 'The updated bound model',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'any',
        },
      ],
    },
    {
      name: 'keydown',
      description: 'Emitted when **any** key is pressed',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'KeyboardEvent',
        },
      ],
    },
    {
      name: 'mousedown',
      description: 'Emitted when click is pressed',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'MouseEvent',
        },
      ],
    },
    {
      name: 'mouseup',
      description: 'Emitted when click is released',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'MouseEvent',
        },
      ],
    },
    {
      name: 'update:error',
      description: 'The `error.sync` event',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'boolean',
        },
      ],
    },
    {
      name: 'update:list-index',
      description: 'Emitted when menu item is selected using keyboard arrows',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'number',
        },
      ],
    },
    {
      name: 'update:search-input',
      description: 'The `search-input.sync` event',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#events',
      arguments: [
        {
          name: 'argument',
          type: 'string',
        },
      ],
    },
  ],
  slots: [
    {
      name: 'append',
      description: 'Adds an item inside the input and after input content',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
    },
    {
      name: 'append-item',
      description: 'Adds an item after menu content',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
    },
    {
      name: 'append-outer',
      description: 'Adds an item outside the input and after input content',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
    },
    {
      name: 'counter',
      description: '',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
      'vue-properties': [
        {
          name: 'props',
          type: '{"dark":"boolean","light":"boolean","max":"string | number","value":"string"}',
        },
      ],
    },
    {
      name: 'default',
      description: 'The default Vue slot.',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
    },
    {
      name: 'item',
      description: 'Define a custom item appearance',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
      'vue-properties': [
        {
          name: 'parent',
          type: 'VueComponent',
        },
        {
          name: 'item',
          type: 'object',
        },
        {
          name: 'on',
          type: 'object // Only needed when providing your own v-list-item',
        },
        {
          name: 'attrs',
          type: 'object // Only needed when providing your own v-list-item',
        },
      ],
    },
    {
      name: 'label',
      description: 'Replaces the default label',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
    },
    {
      name: 'message',
      description: '',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
      'vue-properties': [
        {
          name: 'key',
          type: 'number, // the messages index',
        },
        {
          name: 'message',
          type: 'string, // the message',
        },
      ],
    },
    {
      name: 'no-data',
      description: '',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
    },
    {
      name: 'prepend',
      description: 'Adds an item outside the input and before input content',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
    },
    {
      name: 'prepend-inner',
      description: 'Adds an item inside the input and before input content',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
    },
    {
      name: 'prepend-item',
      description: 'Adds an item before menu content',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
    },
    {
      name: 'progress',
      description: 'Slot for custom progress linear (displayed when **loading** prop is not equal to Boolean False)',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
    },
    {
      name: 'selection',
      description: 'Define a custom selection appearance',
      'doc-url': 'https://www.vuetifyjs.com/api/v-autocomplete#slots',
      'vue-properties': [
        {
          name: 'parent',
          type: 'VueComponent',
        },
        {
          name: 'item',
          type: 'object',
        },
        {
          name: 'index',
          type: 'number',
        },
        {
          name: 'select',
          type: 'function',
        },
        {
          name: 'selected',
          type: 'boolean',
        },
        {
          name: 'disabled',
          type: 'boolean',
        },
      ],
    },
  ],
  'vue-model': {
    prop: 'value',
    event: 'input',
  },
  factory: () => ({
    component: import('./AutocompleteInput.vue'),
  }),
}
