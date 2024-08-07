import { SchemaTypeDefinition, TemplateResolver } from 'sanity'
import page from './documents/page'

import news from './documents/news'
import publication from './documents/publication'
import testimonial from './documents/testimonial '
import accordionItem from './objects/accordionItem'
import aiImage from './objects/aiImage'
import button from './objects/button'
import linkCard from './objects/linkCard'
import menu from './objects/menu/menu'
import accordionSection from './objects/pageSections/accordionSection'
import ctaBannerSection from './objects/pageSections/ctaBannerSection'
import furtherLinksSection from './objects/pageSections/furtherLinksSection'
import imageHeader from './objects/pageSections/imageHeader'
import newsSection from './objects/pageSections/newsSection'
import testimonialSection from './objects/pageSections/testimonialSection'
import textHeader from './objects/pageSections/textHeader'
import textSection from './objects/pageSections/textSection'
import body from './objects/portableText/body'
import overview from './objects/portableText/overview'
import reducedBody from './objects/portableText/reducedBody'
import { deletedDocBinDocument } from './singletons/bin-solution/deletedDocBinDocument'
import siteSettings from './singletons/siteSettings'
import contentArray from './specialFields/contentArray'
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
    accordionItem,
    linkCard,
    // PTE
    body,
    overview,
    reducedBody,
    button,
    // Page builder sections
    textHeader,
    imageHeader,
    accordionSection,
    testimonialSection,
    textSection,
    ctaBannerSection,
    furtherLinksSection,
    newsSection,
    // page builder array
    contentArray,
  ],
  templates: templates,
}
