/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)

export const datasetDemo = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET_DEMO,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET_DEMO',
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-23'

// See the app/api/revalidate/route.ts for how this is used
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET

/**
 * Used to configure edit intent links, for Presentation Mode, as well as to configure where the Studio is mounted in the router.
 */
export const studioUrl = '/studio'

/**
 * Used to configure Slug previews in the Studio
 */
export const DOMAIN =
  process.env.NEXT_PUBLIC_DOMAIN || 'https://page-builder-example.vercel.app/'

export const DRAFT_MODE_ROUTE = process.env.DRAFT_MODE_ROUTE || '/api/draft'
