import { SchemaTypeDefinition, TemplateResolver } from 'sanity'
import page from './documents/page'

import news from './documents/news'
import publication from './documents/publication'
import testimonial from './documents/testimonial '
import aiImage from './objects/aiImage'
import menu from './objects/menu/menu'

import button from './objects/button'
import body from './objects/portableText/body'
import overview from './objects/portableText/overview'
import reducedBody from './objects/portableText/reducedBody'
import { deletedDocBinDocument } from './singletons/bin-solution/deletedDocBinDocument'
import siteSettings from './singletons/siteSettings'
import { templates } from './templates'

export const schema: {
  types: SchemaTypeDefinition[]
  templates: TemplateResolver
} = {
  types: [
    // Singletons
    siteSettings,
    deletedDocBinDocument,
    // Documents
    page,
    testimonial,
    publication,
    news,
    // Objects
    menu,
    aiImage,
    // PTE
    body,
    overview,
    reducedBody,
    button,
  ],
  templates: templates,
}
