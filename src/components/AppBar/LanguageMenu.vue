<template>
  <v-menu offset-y>
    <template v-slot:activator="{on}">
      <v-btn icon v-on="on">
        <v-avatar color="transparent" tile size="32">
          <span>{{ language.abbr }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item v-for="lang in languages" :key="lang.id" dense @click="changeLanguage(lang)">
        <v-list-item-avatar>
          <v-avatar>
            <span class="text-h5">{{ lang.abbr }}</span>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ lang.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'LanguageMenu',
    props: {
      language: {
        type: Object,
        default: () => ({
          id: 1,
          abbr: 'Fa',
          title: 'Farsi',
          flag: '',
        }),
      },
      languages: {
        type: Array,
        default: () => ([
          {
            id: 1,
            abbr: 'Fa',
            title: 'Farsi',
            flag: '',
          },
          {
            id: 2,
            abbr: 'En',
            title: 'English',
            flag: '',
          },
          {
            id: 3,
            abbr: 'Ku',
            title: 'Kurdi',
            flag: '',
          },
        ]),
      },
    },

    methods: {
      changeLanguage () {
      },
    },
  }
</script>
