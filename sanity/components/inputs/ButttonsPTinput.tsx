import type { Button as ButtonType } from '@/types'
import { LaunchIcon } from '@sanity/icons'
import { Button, Card, Flex, Text, Tooltip } from '@sanity/ui'
import { ComponentType, useCallback } from 'react'
import { BlockProps, Path } from 'sanity'
import { useDocumentPane } from 'sanity/structure'

// TODO: DEBUG MODAL MADNESS -> clicking on field in children modal will open parent modal

export const ButtonsPTItem: ComponentType<BlockProps> = (props) => {
  const value = props.value as BlockProps['value'] & {
    buttons: Array<ButtonType & { _key: string }>
  }
  const buttons = value?.buttons
  const { onFocus, onPathOpen } = useDocumentPane()

  // * Open nested buttons input dialog on click
  const handleOpen = useCallback(
    (path: Path) => {
      onPathOpen(path)
      onFocus(path)
    },
    [onFocus, onPathOpen],
  )
  return (
    <Card shadow={1}>
      {props.renderDefault({
        ...props,
        schemaType: {
          ...props.schemaType,
          preview: {
            ...props.schemaType.preview,
            prepare: () => ({
              title: 'Buttons to make your links stand out.',
              subtitle:
                'Edit buttons by clicking on them, or double click here for more',
              media: LaunchIcon,
            }),
          },
        },
      })}
      {/* * BUTTONS THAT WILL OPEN BUTTON DIALOG ONCLICK */}
      {buttons && buttons?.length > 0 && (
        <Card padding={4}>
          <Flex gap={3} justify={'center'} wrap={'wrap'}>
            {buttons.map((button) => {
              const buttonPath = [
                ...props.path,
                'buttons',
                { _key: button._key },
                'title',
              ]
              return (
                <Tooltip
                  key={button?._key}
                  content={
                    <Text muted size={1}>
                      Edit {button?.type} button
                    </Text>
                  }
                  portal={true}
                >
                  <Button
                    onClick={() => handleOpen(buttonPath)}
                    text={button?.title}
                    mode={'ghost'}
                    tone={'primary'}
                    padding={3}
                    radius={2}
                  />
                </Tooltip>
              )
            })}
          </Flex>
        </Card>
      )}
    </Card>
  )
}
