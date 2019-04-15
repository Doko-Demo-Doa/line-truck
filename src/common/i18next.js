import i18next from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(LanguageDetector)
  .use(Backend)
  .init({
    lng: 'en',
    resources: {
      en: { translation: require('./locales/en.json') }
    }
  })

export { i18next }
