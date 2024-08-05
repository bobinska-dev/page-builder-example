import { DRAFT_MODE_ROUTE, apiVersion } from '@/sanity/lib/api'
import { VscHome } from 'react-icons/vsc'
import { Iframe, type IframeOptions } from 'sanity-plugin-iframe-pane'
import {
  type StructureBuilder,
  type StructureResolverContext,
} from 'sanity/structure'

export const homeStructure = async (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  // * Fetch the client
  const client = context.getClient({ apiVersion })
  // * Fetch the home document
  const homeDocument = await client.fetch(
    `*[_type == 'siteSettings'][0].homePage._ref`,
  )
  const iframeOptions = {
    url: {
      origin: 'same-origin',
      preview: (document) => {
        if (!document) {
          return new Error('Missing document')
        }
        switch (document._type) {
          case 'page':
            return (document as any)?.slug?.current
              ? `/${(document as any).slug.current}`
              : new Error('Missing slug')

          default:
            return new Error(`Unknown document type: ${document?._type}`)
        }
      },
      draftMode: DRAFT_MODE_ROUTE,
    },
    reload: { button: true },
  } satisfies IframeOptions

  return S.listItem()
    .id('home')
    .title('Home')
    .icon(VscHome)
    .child(
      S.document()
        .id('homePage')
        .schemaType('page')
        .documentId(homeDocument)
        .views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ]),
    )
}
