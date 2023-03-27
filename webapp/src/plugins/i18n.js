import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../../../src/lang/fa'
import pressMessages from '@peynman/press-vue-core/lang/fa'
import {
  mergeDeep,
} from '@peynman/press-vue-core/utils/helpers'

Vue.use(VueI18n)

const numberFormats = {
  en: {
    currency: {
      style: 'currency',
      currency: 'USD',
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },
  fa: {
    currency: {
      style: 'currency',
      currency: 'IRR',
      currencyDisplay: 'symbol',
      notation: 'compact',
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
    percent: {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: false,
    },
  },
}

const i18n = new VueI18n({
  locale: 'fa', // set locale
  fallbackLocale: 'en',
  messages: mergeDeep(pressMessages, messages), // set locale messages
  numberFormats,
})
export default i18n

const loadedLanguages = ['fa'] // our default language that is preloaded

function setI18nLanguage (lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language hasn't been loaded yet
  return import(`../../../src/lang/${lang}.js`).then(
    messages => {
      i18n.setLocaleMessage(lang, messages.default)
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    },
  )
}
