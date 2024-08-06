import { apiVersion } from '@/sanity/lib/api'
import { VscBell, VscBellDot } from 'react-icons/vsc'
import { StructureBuilder, StructureResolverContext } from 'sanity/structure'

export const newsStructure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  return S.listItem()
    .title('News')
    .icon(VscBell)
    .child(
      S.list()
        .title('News')
        .items([
          // * All Live Pages List
          S.listItem()
            .id('liveNewsDocuments')
            .title('Published News (deployed)')
            .icon(VscBell)
            .child(
              S.documentTypeList('news')
                .title('Published News')
                .filter('_type == "news" && defined(firstPublishedAt)')
                .apiVersion(apiVersion),
            ),

          S.divider(),

          // * All News with changes
          S.listItem()
            .id('editedLiveNews')
            .title('Published News Drafts (edited)')
            .icon(VscBell)
            .child(
              S.documentTypeList('news')
                .title('Edited Published News')
                .filter(
                  `_type == "news" && (_id in path("drafts.**")) && defined(firstPublishedAt)`,
                )
                .apiVersion(apiVersion),
            ),

          // * All Drafts (not published)
          S.listItem()
            .id('unpublishedNews')
            .title('All Unpublished News Drafts')
            .icon(VscBellDot)
            .child(
              S.documentTypeList('news')
                .title('Unpublished News')
                .filter(
                  `_type == "news" && (_id in path("drafts.**")) && !defined(firstPublishedAt)`,
                )
                .apiVersion(apiVersion),
            ),

          S.divider(),

          // * All News List
          S.listItem()
            .id('newsDocuments')
            .title('All News')
            .icon(VscBell)
            .child(
              S.documentTypeList('news')
                .title('All News')
                .filter(`_type == "news"`)
                .apiVersion(apiVersion),
            ),
        ]),
    )
}
