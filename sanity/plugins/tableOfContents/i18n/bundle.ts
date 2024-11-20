import { defineLocaleResourceBundle } from 'sanity'

export const EnglishResourceBundle = defineLocaleResourceBundle({
  locale: 'en-US',
  namespace: 'table-of-contents',
  resources: () => import('./resources'),
})
