import { Card, Stack, Text } from '@sanity/ui'

import { apiVersion } from '@/sanity/lib/api'
import { FooterQuickLink, MenuItemValue } from '@/types'
import { ComponentType, useEffect, useState } from 'react'
import { BooleanInputProps, getIdPair, useClient, useFormValue } from 'sanity'
import { renderItems } from './renderItems'

/** ## InMenuInput
 *
 * This component is used to render the input for the `isInMenu` field in the Sanity Studio.
 *
 */
const InMenuInput: ComponentType<BooleanInputProps> = (props) => {
  const { renderDefault } = props
  const client = useClient({ apiVersion }).withConfig({
    perspective: 'previewDrafts',
  })
  const documentId = useFormValue(['_id']) as string

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
      "firstMenuItems": menu.menuItems[link._ref == $documentId],
      "nestedMenuItems": menu.menuItems[]{
        ...,
        "menuItems":select(count(menuItems[link._ref == $documentId]) > 0 => menuItems[link._ref == $documentId], null),
        }[menuItems != null],
      "footerQuickLinks": quickLinks[_ref == $documentId]
      }{
        "menuItems": [...firstMenuItems, ...nestedMenuItems], footerQuickLinks,
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
              Loading
            </Text>
          </Card>
        )}
        {!loading &&
          renderItems({
            title: 'Menu',
            items: menuItems,
            path: 'menu.menuItems',
          })}
        {!loading &&
          renderItems({
            title: 'Footer Quick Links',
            items: footerQuickLinks,
            path: 'quickLinks',
          })}
      </Stack>
    </Card>
  )
}
export default InMenuInput
