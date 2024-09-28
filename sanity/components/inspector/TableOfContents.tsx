import { capitaliseFirstLetter } from '@/sanity/lib/utils/capitaliseFirstLetter'
import { Card, Flex, Stack, Text } from '@sanity/ui'
import { toPlainText } from 'next-sanity'
import { ComponentType, useCallback } from 'react'
import {
  ArraySchemaType,
  FieldMember,
  Path,
  PortableTextBlock,
  PortableTextTextBlock,
  isPortableTextTextBlock,
} from 'sanity'
import { useDocumentPane } from 'sanity/structure'
import styled from 'styled-components'
import { TableOfContentsProps } from './TableOfContentsInspector'
import { hasOfProperty } from './utils/checkIfMemberhasOfArray'
import { getBlockPath } from './utils/getBlockPath'
import { getIndentation, getNestedIndentation } from './utils/getIndentation'

export const TableOfContents: ComponentType<TableOfContentsProps> = (props) => {
  // * Get the document pane context
  const { onFocus, onPathOpen, formState, activeViewId } = useDocumentPane()
  // * Open nested buttons input dialog on click
  const handleOpen = useCallback(
    (path: Path) => {
      onPathOpen(path)
      onFocus(path)
    },
    [onFocus, onPathOpen],
  )
  const docValue = formState?.value

  // find all fields that are array and constain blocks
  const pteFields = formState?.members.filter((member) => {
    const fieldMember = member as FieldMember
    const schemaType = fieldMember?.field?.schemaType as ArraySchemaType

    return (
      schemaType &&
      hasOfProperty(schemaType) &&
      schemaType?.of.some((type) => type.name === 'block')
    )
  })

  return (
    <Stack space={4} paddingY={4} paddingX={3}>
      {(pteFields as FieldMember[])?.map((field) => {
        const fieldDef = field.field
        const fieldPath = fieldDef.path
        const fieldValue = docValue?.[fieldDef.id] as
          | PortableTextBlock[]
          | undefined
        const headingsAndCustomBlocks = fieldValue?.filter((block) => {
          // filter out all items, that are of type block and have a style property starting with h (headings) or are a custom block
          if (block._type === 'block') {
            const textBlock = block as PortableTextTextBlock
            if (textBlock?.style?.startsWith('h')) return true
            return false
          }
          if (block._type !== 'bock') return true
          return false
        })

        return (
          <Card as={'li'}>
            <Card as="label">
              <Text as={'h3'} size={0} muted>
                Path: {fieldDef?.schemaType.title}
              </Text>
            </Card>
            {!headingsAndCustomBlocks?.length && (
              <Card padding={4}>
                <Text size={1} muted style={{ fontStyle: 'italic' }}>
                  No headings or custom blocks found
                </Text>
              </Card>
            )}
            {headingsAndCustomBlocks && headingsAndCustomBlocks?.length > 0 && (
              <Stack space={4} paddingY={4} paddingX={3} as="ul">
                {headingsAndCustomBlocks?.map((block) => {
                  const blockPath = getBlockPath(block, fieldPath)

                  // * Heading indentation based on style
                  const indentation = block.style
                    ? getIndentation(block)
                    : // get indentation of nested blocks based on the previous heading blocks style property
                      getNestedIndentation(block, headingsAndCustomBlocks)

                  const getTypeTitle = (type: string) => {
                    if (type === 'block') return 'Text Block'
                    if (type !== 'block' && hasOfProperty(fieldDef?.schemaType))
                      //@ts-ignore
                      return fieldDef?.schemaType.of.find(
                        (ofType) => ofType.name === type,
                      )?.title
                  }

                  return (
                    <Card
                      onClick={() => handleOpen(blockPath)}
                      marginLeft={indentation}
                      paddingLeft={2}
                      paddingBottom={1}
                      as="li"
                    >
                      <Pointer gap={2} align={'center'} justify={'flex-start'}>
                        {isPortableTextTextBlock(block) && block.style && (
                          <Text size={0} muted>
                            {capitaliseFirstLetter(block.style as string)}:
                          </Text>
                        )}
                        <Text
                          size={1}
                          muted={Boolean(!block.style)}
                          style={{
                            fontStyle: block.style ? 'inherit' : 'italic',
                          }}
                        >
                          {isPortableTextTextBlock(block)
                            ? toPlainText([block])
                            : block.body
                              ? `${getTypeTitle(block._type)} - ${toPlainText((block as any).body).substring(0, 60)} ...`
                              : `${getTypeTitle(block._type)}`}
                        </Text>
                        <Text id={'arrow'} size={1}>
                          →{' '}
                        </Text>
                      </Pointer>
                    </Card>
                  )
                })}
              </Stack>
            )}
          </Card>
        )
      })}
    </Stack>
  )
}

const Pointer = styled(Flex)`
  cursor: pointer;
  #arrow {
    opacity: 0;
  }
  &:hover {
    #arrow {
      opacity: var(--card-hover-opacity, 0.5);
    }
  }
`
