import { Card, Stack, Text } from '@sanity/ui'

import { apiVersion } from '@/sanity/lib/api'
import { FooterQuickLink, MenuItemValue } from '@/types'
import { ComponentType, useEffect, useMemo, useState } from 'react'
import {
  BooleanInputProps,
  Path,
  getIdPair,
  useClient,
  useFormValue,
} from 'sanity'
import { renderItems } from './renderItems'

import { useRouter, useRouterState } from 'sanity/router'
import { RouterPanes } from 'sanity/structure'

// TODO: Add new menu items to the settings doc query
/** ## InMenuInput
 *
 * This component is used to render the input for the `isInMenu` field in the Sanity Studio.
 *
 */
const InMenuInput: ComponentType<BooleanInputProps> = (props) => {
  const client = useClient({ apiVersion }).withConfig({
    perspective: 'previewDrafts',
  })
  const documentId = useFormValue(['_id']) as string
  const documentType = useFormValue(['_type']) as string

  // * Router states for panes and navigation functions
  const { navigate } = useRouter()
  const routerState = useRouterState()
  // * Get the current router pane groups that are open
  const routerPaneGroups = useMemo<RouterPanes>(
    () => (routerState?.panes || []) as RouterPanes,
    [routerState?.panes],
  )
  console.log(routerPaneGroups) // * Open a new pane with the settings document to the right of current routerState
  const openPane = (path: Path) => {
    const nextPanes: RouterPanes = [
      // keep existing panes
      ...routerPaneGroups.filter((group) => group[0].id !== 'siteSettings'),
      [
        {
          id: 'siteSettings',
          params: {
            type: 'siteSettings',
          },
        },
      ],
    ]

    navigate(
      {
        panes: nextPanes,
      },
      { replace: true },
    )
  }
  const [loading, setLoading] = useState(true)
  const [menuItems, setMenuItems] = useState<MenuItemValue[] | undefined>()
  const [footerQuickLinks, setFooterQuickLinks] = useState<
    FooterQuickLink[] | undefined
  >()
  const { publishedId } = getIdPair(documentId)
  // fetch siteSettings doc and get menuItems
  useEffect(() => {
    setLoading(true)
    const settingsQuery = `*[_type == "siteSettings"][0]{
      homePage._ref == $documentId => { "homePage": { "_ref": homePage._ref, "_type": 'home' } },
      "firstMenuItems": menu[link._ref == $documentId],
      "nestedMenuItems": menu[]{
        ...,
        "menuItems":select(count(menuItems[link._ref == $documentId]) > 0 => menuItems[link._ref == $documentId], null),
        }[menuItems != null],
      "footerQuickLinks": quickLinks[_ref == $documentId]
      }{
        "menuItems": array::compact([homePage, ...firstMenuItems, ...nestedMenuItems]), footerQuickLinks,
      }`
    const params = { documentId: publishedId }

    client
      .fetch(settingsQuery, params)
      .then((res) => {
        res.menuItems.length > 0 && setMenuItems(res.menuItems)
        res.footerQuickLinks.length > 0 &&
          setFooterQuickLinks(res.footerQuickLinks)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  return (
    <Card>
      <Stack space={2}>
        {/* <Card>{renderDefault(props)}</Card> */}
        <Card>
          <Text weight="semibold" as={'h2'} size={1} id="pagePlacement">
            Page Placement Settings
          </Text>
        </Card>
        {loading && (
          <Card padding={3}>
            <Text style={{ fontStyle: 'italic' }} size={1} muted>
              Loading...
            </Text>
          </Card>
        )}
        {!loading &&
          documentType !== 'news' &&
          renderItems({
            title: 'Menu',
            items: menuItems,
            openPane: openPane,
            path: ['menu', 'menuItems'],
          })}
        {!loading &&
          renderItems({
            title: 'Footer Quick Links',
            items: footerQuickLinks,
            openPane: openPane,
            path: ['quickLinks'],
          })}
      </Stack>
    </Card>
  )
}
export default InMenuInput
