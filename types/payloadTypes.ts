import { Overview } from '@/sanity.types'
import {
  ContentPayload,
  FooterQuickLink,
  ImageWithMetadata,
  MenuItem,
} from './partsAndObjectTypes'

// * * * *  FULL QUERY PAYLOADS  * * * *

export interface NewsPayload {
  _id: string
  _type: string
  title: string
  subtitle: string
  slug: string
  image: ImageWithMetadata
}

/** ### Payload for a page
 *
 * Payload for `pageQuery` & `homePageQuery` -> based on the `page` document
 *
 * #### Definition & Values:
 *
 *  ```typescript
 * export interface PagePayload {
 *  _id: string
 *  _type: string
 *  title: string
 *  description: Overview
 *  slug: string
 *  content: ContentPayload
 *  image: ImageWithMetadata
 * }
 * ```
 *
 */
export interface PagePayload {
  _id: string
  _type: string
  title: string
  description: Overview
  slug: string
  content: ContentPayload
  image: ImageWithMetadata
}

/** ### Payload for the site settings
 *
 * Payload for `settingsQuery` and based on the `siteSettings` document
 *
 * #### Definition & Values:
 *  ```typescript
 * export interface SettingsPayload {
 *  menuItems: MenuItem[]
 * footerQuickLinks?: FooterQuickLink[]
 * ogImage?: ImageWithMetadata
 * logos: {
 *  logoColor: ImageWithMetadata
 * logoBlack?: ImageWithMetadata
 * logoWhite?: ImageWithMetadata
 * }
 * serverError: ImageWithMetadata
 * pageNotFound: ImageWithMetadata
 * }
 * ```
 *
 */
export interface SettingsPayload {
  menu: MenuItem[]
  footerQuickLinks?: FooterQuickLink[]
  // images
  ogImage?: ImageWithMetadata
  logos: {
    logoColor: ImageWithMetadata
    logoBlack?: ImageWithMetadata
    logoWhite?: ImageWithMetadata
  }
  serverError: ImageWithMetadata
  pageNotFound: ImageWithMetadata
}
