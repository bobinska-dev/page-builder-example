import { definePlugin } from 'sanity'
import { EnglishResourceBundle } from './i18n/bundle'
import { tableOfContentsInspector } from './inspector'

/** ## Table of Content Plugin Options
 *
 * This plugin is responsible for adding a “Table of Content” inspector to the document forms.
 *
 *
 *
 */
export interface TableOfContentsPluginOptions {
  /** All Portable Text and array fields that should be used */
  fieldNames: string[]
  /** All document types that should be used */
  documentTypes: string[]
}

/** ## Table of contents plugin
 *
 * This plugin is responsible for adding a “Table of Content” inspector to the document forms defined in the `documentTypes` array.
 *
 * @param fieldNames - All All Portable Text and other arrays of objects that should be used (for example page builder arrays, nut also embedded array fields that are used in Portable Text and are significant for the document structure)
 *
 * @param documentTypes - All document types that the plugin should be used for
 *
 */
export const tableOfContentsPlugin = definePlugin<TableOfContentsPluginOptions>(
  ({ fieldNames, documentTypes }) => ({
    name: 'tableOfContents',

    document: {
      inspectors: (prev, context) => {
        if (documentTypes.includes(context.documentType)) {
          return [
            tableOfContentsInspector({
              fieldNames,
              documentTypes,
            }),
            ...prev,
          ]
        }
        return prev
      },
    },
    i18n: {
      bundles: (prev, context) => [...prev, EnglishResourceBundle],
    },
  }),
)
