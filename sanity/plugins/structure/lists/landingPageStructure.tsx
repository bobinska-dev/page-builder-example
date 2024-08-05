import { apiVersion } from '@/sanity/lib/api'
import { VscBrowser } from 'react-icons/vsc'
import { StructureBuilder, StructureResolverContext } from 'sanity/structure'

/** ## Pages according to their appearance in the menu array defined in Site Settings */
export const landingPageStructure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  // * Fetch the client
  const client = context
    .getClient({ apiVersion })
    .withConfig({ perspective: 'previewDrafts' })

  return S.listItem()
    .id('landingPages')
    .title('Landing Pages (not in Menu)')
    .icon(VscBrowser)
    .child(async () => {
      // * Fetch menu Items
      const pageMenuItems = await client.fetch(
        // make sure you don't overfetch -> only return the value that you need and name it appropriately
        ` *[_type == "siteSettings"][0]{
            "menuItems": menu.menuItems[isNested != true].link->._id,
            "subItems": menu.menuItems[isNested == true].menuItems[].link->._id
            }{
              "pageIds":[...menuItems, ...subItems ]
            }{
              pageIds,
              "pages": *[_type == 'page' && !(_id in ^.pageIds)]._id
            }.pages`,
      )
      const pageItems = pageMenuItems.map((page: any) => {
        return S.documentListItem()
          .id(page)
          .schemaType('page')
          .icon(VscBrowser)
          .child(S.document().id(page).schemaType('page').documentId(page))
      })
      return S.list().title('Landing Pages (not in the menu)').items(pageItems)
    })
}
