import { apiVersion } from '@/sanity/lib/api'
import { capitaliseFirstLetter } from '@/sanity/lib/utils/capitaliseFirstLetter'
import { Card, Flex, Stack, Text } from '@sanity/ui'
import groq from 'groq'
import { ComponentType, useCallback, useEffect, useState } from 'react'
import { getIdPair, Path, useClient } from 'sanity'
import { useDocumentPane } from 'sanity/structure'
import styled from 'styled-components'

type HeadingsListProps = {
  documentId: string
}
// TODO: ADD PAGE TYPE TO QUERY
export const HeadingsList: ComponentType<HeadingsListProps> = (props) => {
  const client = useClient({ apiVersion }).withConfig({
    perspective: 'previewDrafts',
  })
  const publishedId = getIdPair(props.documentId).publishedId
  const [content, setContent] = useState<{
    bodyPath: string
    _type: string
    body: {
      _type: string
      _key: string
      style?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      text?: string
    }[]
  } | null>(null)

  useEffect(() => {
    const query = groq`*[_id == $documentId][0]{
      _type == 'news' => { 
        body[style != 'normal'] {
          _key, _type, style, "text": array::join(children[].text, ' ')
        },
        "bodyPath": "body",
        _type,
      },
      
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

        // * Heading indentation
        const indentation =
          block.style === 'h2'
            ? 0
            : block.style === 'h3'
              ? 3
              : block.style === 'h4'
                ? 4
                : block.style === 'h5'
                  ? 5
                  : block.style === 'h6'
                    ? 6
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
