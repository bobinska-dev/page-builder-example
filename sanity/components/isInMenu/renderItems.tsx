import { FooterQuickLink, MenuItemValue } from '@/types'
import { Card, Flex, Stack, Text } from '@sanity/ui'
import { IntentButton } from 'sanity'

export const renderItems = ({
  path,
  items,
  title,
}: {
  path: string
  items: MenuItemValue[] | FooterQuickLink[] | undefined
  title: string
}) => {
  return (
    <Stack space={3} paddingX={3}>
      {/*
       * * * * Title * * * *
       */}
      <Card paddingTop={3}>
        <Text as={'h3'} weight="semibold" size={1}>
          {title}
        </Text>
      </Card>
      {/*
       * * * * No items -> buttons to settings fields to add a new items for this page * * * *
       */}
      {!items && (
        <Card padding={3} shadow={1}>
          <Flex justify={'space-between'} align={'center'}>
            <Card>
              <Text size={1}>This page is not part of the {title}</Text>
            </Card>
            <IntentButton
              intent="edit"
              mode="ghost"
              params={{
                id: 'siteSettings',
                type: 'siteSettings',
                path: path,
              }}
              text={`Add to the ${title}`}
              tooltipProps={{
                placement: 'top',
                content: `Edit the ${title} in the overall Site Settings`,
              }}
            />
          </Flex>
        </Card>
      )}
      {/*
       * * * * Items with IntentButtons * * * *
       */}
      {items && (
        <Stack space={3}>
          {items.map((item: MenuItemValue | FooterQuickLink, index: number) => {
            return (
              <Card key={item._key} padding={3} shadow={1}>
                <Flex justify={'space-between'} align={'center'}>
                  <Text as={'h4'} weight="semibold" size={1}>
                    {/* If item is of type MenuItemValue, return item.title, if not a string `This page is part of the Quicklinks as the ${item.index+1}th item` */}
                    {item._type === 'menuItem'
                      ? (item as MenuItemValue).isNested
                        ? // @ts-ignore
                          item.title + ' → ' + item.menuItems[0]?.title
                        : (item as MenuItemValue).title
                      : `This page is part of the quick links as the ${index + 1}. item`}
                  </Text>
                  <IntentButton
                    intent="edit"
                    mode="ghost"
                    params={{
                      id: 'siteSettings',
                      type: 'siteSettings',
                      path:
                        item._type === 'menuItem'
                          ? (item as MenuItemValue).isNested
                            ? // @ts-ignore
                              `menu.menuItems[_key == "${item._key}"].menuItems[_key == "${item.menuItems[0]?._key}"].title`
                            : `menu.menuItems[_key == "${item._key}"].title`
                          : `quickLinks[_key == "${item._key}"]`,
                    }}
                    text="Edit in Settings"
                    tooltipProps={{
                      placement: 'top',
                      content:
                        item._type === 'menuItem'
                          ? 'Edit the menu item in the overall Site Settings'
                          : 'Edit the Quicklink in the overall Site Settings',
                    }}
                  />
                </Flex>
              </Card>
            )
          })}
        </Stack>
      )}
    </Stack>
  )
}
