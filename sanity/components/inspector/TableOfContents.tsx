import { apiVersion } from '@/sanity/lib/api'
import { capitaliseFirstLetter } from '@/sanity/lib/utils/capitaliseFirstLetter'
import { Card, Flex, Stack, Text } from '@sanity/ui'
import groq from 'groq'
import { ComponentType, useCallback, useEffect, useState } from 'react'
import { Path, useClient } from 'sanity'
import { useDocumentPane } from 'sanity/structure'
import styled from 'styled-components'
import { TableOfContentsProps } from './TableOfContentsInspector'

export const TableOfContents: ComponentType<TableOfContentsProps> = (props) => {
  const client = useClient({ apiVersion }).withConfig({
    perspective: 'previewDrafts',
  })

  const [content, setContent] = useState<{
    bodyPath: string
    _type: string
    body: {
      _type: string
      _key: string
      style?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      text?: string
    }[]
  } | null>(null)

  useEffect(() => {
    const query = groq`*[_id == $documentId && _type == 'news'][0]{
      body[style != 'normal'] {
          _key, _type, style, "text": array::join(children[].text, ' ')
        },
        _type,
        "bodyPath": "body",
    }`

    const params = { documentId: props.documentId }
    client
      .fetch(query, params)
      .then((result) => {
        setContent(result)
      })
      .catch((error) => console.error(error))
  }, [])

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
    <Stack space={4} paddingY={4} paddingX={3}>
      <Card>
        <Text as={'h3'} size={0} muted>
          Path: {content?.bodyPath}
        </Text>
      </Card>
      {content?.body.map((block) => {
        // * Get the path to the block
        const blockPath =
          block._type === 'block'
            ? [content.bodyPath, { _key: block._key }]
            : block._type === 'buttons'
              ? [content.bodyPath, { _key: block._key }, 'buttons']
              : [content.bodyPath, { _key: block._key }, 'title']

        // * Heading indentation based on style
        const indentation = block.style?.startsWith('h')
          ? // h2 has no indentation
            Number(block.style.slice(1)) === 2
            ? 0
            : // all other indentations match the heading level
              Number(block.style.slice(1))
          : 0

        return (
          <Card
            onClick={() => handleOpen(blockPath)}
            marginX={indentation}
            paddingLeft={2}
            paddingBottom={1}
          >
            <Pointer gap={2} align={'center'} justify={'flex-start'}>
              {block.style && (
                <Text as={block.style || 'p'} size={0} muted>
                  {capitaliseFirstLetter(block.style!)}:
                </Text>
              )}
              <Text
                as={block.style || 'p'}
                size={1}
                muted={Boolean(!block.style)}
                style={{ fontStyle: block.style ? 'inherit' : 'italic' }}
              >
                {block.style
                  ? block.text
                  : `${capitaliseFirstLetter(block._type)}`}
              </Text>
              <Text id={'arrow'} size={1}>
                →{' '}
              </Text>
            </Pointer>
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
