import { SchemaTypeDefinition, TemplateResolver } from 'sanity'
import page from './documents/page'
import menu from './objects/menu/menu'
import body from './objects/portableText/body'
import overview from './objects/portableText/overview'
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
    // Objects
    body,
    overview,
    menu,
  ],
  templates: templates,
}
