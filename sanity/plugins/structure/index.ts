import { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import { hiddenDocTypes } from './hiddenDocumentTypes'
import { aiStructure } from './lists/aiStructure'
import { singletonListItems } from './lists/singletonStructure'

/** # Structure Tool with Custom Structure list
 *
 * This is the custom structure tool for the studio.
 *
 * ## AI Assist context document type
 *
 * the `assist.instruction.context` document type is hidden here {@link hiddenDocTypes}
 *
 * (go to the Template Structure to work on those)
 */
export const structure = async (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  return S.list()
    .title('Content')
    .items([
      // await pageStructure(S, context),
      S.divider(),

      // The rest of this document is from the original manual grouping in this series of articles
      ...S.documentTypeListItems().filter(hiddenDocTypes),

      S.divider(),
      // All singleton documents
      ...singletonListItems(S),
      aiStructure(S),
    ])
}
