import { apiVersion } from '@/sanity/lib/api'

import { VscBrowser } from 'react-icons/vsc'
import { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import { homeStructure } from './homeStructure'
import { landingPageStructure } from './landingPageStructure'
import { menuPagesStructure } from './menuPagesStructure'
import { unpublishedDraftPageStructure } from './unpublishedDraftPageStructure'

export const pageStructure = async (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  return S.listItem()
    .title('Pages')
    .child(
      S.list()
        .title('Pages')
        .items([
          // * Home
          await homeStructure(S, context),
          // * Pages in Menu
          menuPagesStructure(S, context),

          S.divider(),

          // * Landing Pages (not in menu)
          landingPageStructure(S, context),

          S.divider(),

          // * All Live Pages List
          S.listItem()
            .id('livePages')
            .title('All Live Pages (deployed)')
            .icon(VscBrowser)
            .child(
              S.documentTypeList('page')
                .title('Live Pages')
                .filter('_type == "page" && defined(firstPublishedAt)')
                .apiVersion(apiVersion),
            ),

          // * All Pages with changes
          S.listItem()
            .id('editedLivePages')
            .title('All Live Page Drafts (edited)')
            .icon(VscBrowser)
            .child(
              S.documentTypeList('page')
                .title('Edited (live) Pages')
                .filter(
                  `_type == "page" && (_id in path("drafts.**")) && defined(firstPublishedAt)`,
                )
                .apiVersion(apiVersion),
            ),

          S.divider(),

          // * All Drafts (not published)
          unpublishedDraftPageStructure(S, context),

          S.divider(),

          // * All Pages List
          S.listItem()
            .id('pages')
            .title('All Pages')
            .icon(VscBrowser)
            .child(
              S.documentTypeList('page')
                .title('All Pages')
                .filter(`_type == "page"`)
                .apiVersion(apiVersion),
            ),
        ]),
    )
}
