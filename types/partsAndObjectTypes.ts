import { Overview, ReducedBody } from '@/sanity.types'
import type { Image, PortableTextBlock, ReferenceValue } from 'sanity'
import { NewsPayload } from './payloadTypes'

// * * * *  PARTS AND OBJECTS  * * * *

/** Menu Item type for query results */
export interface MenuItem {
  _key: string
  _type: string
  slug?: string
  title: string
  docType?: string
  isNested?: boolean
  menuItems?: MenuItem[]
}
/** Button type for PTE query results */
export interface PTEButtonType {
  _type: 'button'
  _key: string
  title: string
  type: 'internal' | 'external' | 'functional' | 'file'
  href?: string
  docType?: string
  slug?: string
  functional?: 'contact' | 'subscribe'
}
/** Type for image query results */
export interface ImageWithMetadata extends Image {
  altText: string
  blurHashURL?: string
  _type: 'aiImage' | 'image'
}
/** Type for footer quick links in query results */
export interface FooterQuickLink {
  _key: string
  docType: string
  slug: string
  _type?: string
}

/** Accordion Item Payload */
export interface AccordionItemPayload {
  _type: 'accordionItem'
  _key: string
  title: string
  // TODO: CHECK IF ANNOTATIONS NEED TO BE ADDED
  body: ReducedBody
}
/** Link Card Payload */
export interface LinkCardPayload {
  _type: 'linkCard'
  _key: string
  title: Overview
  description: Overview
  url?: string
  slug?: string
  docType?: string
  internalLink?: ReferenceValue
}
/** Testimonial Payload */
export interface TestimonialPayload {
  _type: 'testimonial'
  _id: string
  title: string
  body: PortableTextBlock[]
  tags?: Array<string>
}

// * * BODY * *

/** Image block Type in query results */
export interface ImageBlock extends Omit<ImageWithMetadata, '_type'> {
  _type: 'imageBlock'
  _key: string
}
/** Buttons block Type in query results */
export interface ButtonBlock {
  buttons: PTEButtonType[]
  _type: 'buttons'
  _key: string
}
/** Body Payload in query results */
export type BodyPayload = Array<PortableTextBlock | ImageBlock | ButtonBlock>

// * * * Page builder & Sections * * *

/** Image Header Section Payload */
export interface ImageHeaderSectionPayload {
  _type: 'imageHeaderSection'
  _key: string
  image: ImageWithMetadata
  title: Overview
  subtitle?: Overview
}
/** Text Header Section Payload */
export interface TextHeaderSectionPayload {
  _type: 'textHeaderSection'
  _key: string
  title: Overview
  subtitle?: Overview
  body: BodyPayload
}
/** Text Section Payload */
export interface TextSectionPayload {
  _type: 'textSection'
  _key: string
  title: Overview
  subtitle?: Overview
  body: BodyPayload
}
/** Accordion Section Payload */
export interface AccordionSectionPayload {
  _type: 'accordionSection'
  _key: string
  title: Overview
  body: BodyPayload
  accordion: Array<AccordionItemPayload>
}
/** CTA Banner Section Payload */
export interface CtaBannerSectionPayload {
  _type: 'ctaBannerSection'
  _key: string
  title: Overview
  body: BodyPayload
}
/** Further Links Section Payload */
export interface FurtherLinkSectionPayload {
  _type: 'furtherLinkSection'
  _key: string
  title: Overview
  body: BodyPayload
  links: LinkCardPayload[]
}
/** News Section Payload */
export interface NewsSectionPayload {
  _type: 'newsSection'
  _key: string
  title: Overview
  body?: BodyPayload
  loadAll?: boolean
  news: NewsPayload[]
}
/** Testimonial Section Payload */
export interface TestimonialSectionPayload {
  _type: 'testimonialSection'
  _key: string
  title: Overview
  body?: BodyPayload
  testimonials: TestimonialPayload[]
  loadTags?: Array<'loadAll' | 'investor' | 'partner' | 'customer'>
}

/** Content Payload in query results */
export type ContentPayload = Array<
  // headers
  | ImageHeaderSectionPayload
  | TextHeaderSectionPayload
  // text section
  | TextSectionPayload
  // accordionSection
  | AccordionSectionPayload
  // ctaBannerSection
  | CtaBannerSectionPayload
  // furtherLinksSection
  | FurtherLinkSectionPayload
  // news section
  | NewsSectionPayload
  // testimonial section
  | TestimonialSectionPayload
>
