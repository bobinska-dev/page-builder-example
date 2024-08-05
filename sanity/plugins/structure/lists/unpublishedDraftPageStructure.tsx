import { apiVersion } from '@/sanity/lib/api'

import { VscBrowser, VscEmptyWindow } from 'react-icons/vsc'
import { StructureBuilder, StructureResolverContext } from 'sanity/structure'

/** ## Unpublished Pages (drafts)
 *
 */
export const unpublishedDraftPageStructure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  // * Fetch the client
  const client = context
    .getClient({ apiVersion })
    .withConfig({ perspective: 'previewDrafts' })

  return S.listItem()
    .id('draftPages')
    .title('Unpublished Page Drafts')
    .icon(VscEmptyWindow)
    .child(async () => {
      // * Fetch pages
      const pages = await client.fetch(
        // make sure you don't overfetch -> only return the value that you need and name it appropriately
        `*[_type in ['page', 'landingPage'] && !defined(firstPublishedAt)]{ _id, title, _type }`,
      )

      const pageItems = pages.map((page: any) => {
        // *  If the menu item is not nested return a list item which opens the document in question
        return S.documentListItem()
          .id(page._id)
          .schemaType(page._type)
          .title(page.title)
          .icon(VscBrowser)
          .child(
            S.document()
              .id(page._id)
              .schemaType(page._type)
              .documentId(page._id),
          )
      })
      return S.list().title('Menu Structure').items(pageItems)
    })
}
