import { apiVersion } from '@/sanity/lib/api'
import { MenuItemValue } from '@/types'

import { VscBrowser, VscMultipleWindows } from 'react-icons/vsc'

import { StructureBuilder, StructureResolverContext } from 'sanity/structure'

/** ## Pages according to their appearance in the menu array defined in Site Settings */
export const menuPagesStructure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  // * Fetch the client
  const client = context
    .getClient({ apiVersion })
    .withConfig({ perspective: 'previewDrafts' })

  return S.listItem()
    .id('menuPages')
    .title('Pages in Menu')
    .icon(VscBrowser)
    .child(async () => {
      // * Fetch menu Items
      const pageMenuItems = await client.fetch(
        // make sure you don't overfetch -> only return the value that you need and name it appropriately
        `*[_id == 'siteSettings'][0].menu`,
      )
      const pageItems = pageMenuItems.map((menuItem: MenuItemValue) => {
        // * Check if the menu item is nested return a list item with a child list
        const isNested = menuItem.isNested
        if (isNested) {
          return S.listItem()
            .id(menuItem._key)
            .title(menuItem.title)
            .icon(VscMultipleWindows)

            .child(
              S.list()
                .title(menuItem.title)
                .id(menuItem._key)
                .items(
                  menuItem.menuItems?.map((nestedMenuItem: MenuItemValue) => {
                    return S.documentListItem()
                      .id(nestedMenuItem.link?._ref!)
                      .schemaType('page')
                      .title(nestedMenuItem.title)
                      .icon(VscBrowser)
                      .child(
                        S.document()
                          .id(nestedMenuItem.link?._ref!)
                          .schemaType('page')
                          .documentId(nestedMenuItem.link?._ref!),
                      )
                  }) || [],
                ),
            )
        }
        // *  If the menu item is not nested return a list item which opens the document in question
        return S.listItem()
          .id(menuItem.link?._ref!)
          .title(menuItem.title)
          .icon(VscBrowser)
          .child(
            S.document()
              .id(menuItem.link?._ref!)
              .schemaType('page')
              .documentId(menuItem.link?._ref!),
          )
      })
      return S.list().title('Menu Structure').items(pageItems)
    })
}
