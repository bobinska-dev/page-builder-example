'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */
import { assist } from '@sanity/assist'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import * as resolve from '@/sanity/plugins/resolve'
import { singletonPlugin } from '@/sanity/plugins/settings'

import { media } from 'sanity-plugin-media'
import { ptString } from 'sanity-plugin-pt-string'
import { tableOfContentsInspector } from './sanity/components/inspector'
import { documentActions } from './sanity/documentActions'
import { previewDocumentNode } from './sanity/plugins/previewPane'
import { structure } from './sanity/plugins/structure'
import { schema } from './sanity/schemas/schemas'
import { allSingletonTypeNames } from './sanity/schemas/singletons'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  'Page builder example by Saskia Bobinska'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  // both schemas and templates are defined in /sanity/schemas
  schema,
  plugins: [
    structureTool({
      structure: structure,
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode(),
    }),

    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),

    // Adds a custom string input type for Portable text
    // https://www.npmjs.com/package/sanity-plugin-pt-string
    ptString(),

    // AI Assist
    assist(),

    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin(allSingletonTypeNames),

    // Add an image asset source for Unsplash
    unsplashImageAsset(),

    media(),

    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    inspectors: (prev, context) => {
      if (context.documentType === 'page' || context.documentType === 'news') {
        return [tableOfContentsInspector, ...prev]
      }
      return prev
    },
    actions: (prev, context) => documentActions(prev, context),
  },

  beta: {
    treeArrayEditing: {
      enabled: true,
    },
  },
})
