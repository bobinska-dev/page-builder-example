import { allSingletonTypeNames } from '@/sanity/schemas/singletons'

/** # Hidden document types
 *
 * This is a list of all the document types that should be hidden from the auto-generated document type lists in the structure builder.
 *
 * This includes:
 *
 * - all the singletons imported from the `singletons` folder
 *
 * - the `assist.instruction.context` document type (go to the Template Structure to work on those)
 *
 *
 */
export const hiddenDocTypes = (listItem: any) =>
  ![
    'media.tag',
    // All Documents
    'page',
    'news',
    // AI Assist context document type
    'assist.instruction.context',
    // All Singletons
    ...allSingletonTypeNames,
  ].includes(listItem.getId())
