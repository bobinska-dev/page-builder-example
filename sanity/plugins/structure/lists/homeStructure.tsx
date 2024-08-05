import { DRAFT_MODE_ROUTE, apiVersion } from '@/sanity/lib/api'
import { Flex, Stack, Text } from '@sanity/ui'
import { VscHome } from 'react-icons/vsc'
import { IntentButton } from 'sanity'
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
  const client = context
    .getClient({ apiVersion })
    .withConfig({ perspective: 'previewDrafts' })
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
      homeDocument
        ? S.document()
            .id('homePage')
            .schemaType('page')
            .documentId(homeDocument)
            .views([
              S.view.form(),
              S.view.component(Iframe).options(iframeOptions).title('Preview'),
            ])
        : S.component(() => {
            return (
              <Flex align={'center'} justify={'center'} padding={6}>
                <Stack space={5}>
                  <Text as="h3" weight="semibold">
                    Home page not set
                  </Text>
                  <Text as="p" size={1}>
                    Please select a page to be used as the home page in the site
                    settings.
                  </Text>
                  <Text as="p" size={1} muted>
                    If you have set a page already, you might need to reload the
                    Studio.
                  </Text>
                  <IntentButton
                    intent="edit"
                    mode="ghost"
                    replace={false}
                    params={{
                      id: 'siteSettings',
                      type: 'siteSettings',
                      path: 'homePage',
                    }}
                    text="Add home page to site settings"
                    tooltipProps={{
                      placement: 'top',
                      content: 'Edit the home page Site Settings',
                    }}
                  />
                </Stack>
              </Flex>
            )
          }).id('missingHomePage'),
    )
}
