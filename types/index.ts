// * * * * PAYLOADS AND QUERY RESULTS * * * *
// For schema types and type-generated query-results from Sanity see sanity.types.ts

import { ReferenceValue } from 'sanity'

export * from './partsAndObjectTypes'
export * from './payloadTypes'
export * from './studioRelatedTypes'

// redeclare Asset to also include media tags from media browser
declare module 'sanity' {
  interface Asset {
    opt?: {
      media?: {
        tags?: ReferenceValue[]
      }
    }
    creditLine?: string
  }
}
