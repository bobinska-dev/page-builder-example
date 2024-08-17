import { AccordionSection, Content, FurtherLinkSection } from '@/sanity.types'
import { capitaliseFirstLetter } from '@/sanity/lib/utils/capitaliseFirstLetter'
import { Box, Card, Stack, Text, Tooltip } from '@sanity/ui'
import { ComponentType } from 'react'
import { VscLinkExternal, VscTriangleRight } from 'react-icons/vsc'
import { ArraySchemaType, isArray, Path, Schema } from 'sanity'
import styled from 'styled-components'
import { BodyHeader } from '../TableOfContents'
import { getIndentation, getNestedIndentation } from '../utils/getIndentation'
import { getTitle } from '../utils/getSectionTitle'
import { hasBody, hasProperty } from '../utils/typechecker'
import Pointer from './Pointer'

type SectionType = Content extends (infer U)[] ? U : never

const ContentSection: ComponentType<
  SectionType & {
    schemaTypeTitle: string
    handleOpen: (path: Path) => void
    schema: Schema
  }
> = (props) => {
  const bodyType = props.schema?.get('body') as ArraySchemaType

  // Path to the section title
  const sectionBodyPath = ['content', { _key: props._key }, 'body']
  const sectionTitlePath = ['content', { _key: props._key }, 'title']
  return (
    <Tooltip
      content={
        <Box padding={1}>
          <Text muted size={1}>
            Section: {props.schemaTypeTitle}
          </Text>
        </Box>
      }
      fallbackPlacements={['right', 'left']}
      placement="top"
      portal
      delay={{ open: 1200, close: 100 }}
    >
      <StackWithBorder space={4} paddingLeft={2} paddingBottom={2}>
        {/* Section Headers */}
        <Card
          key={props._key}
          paddingBottom={1}
          onClick={() => props.handleOpen(sectionTitlePath)}
        >
          {/* Schema type title brow */}
          {/* <Brow title={props.schemaTypeTitle} /> */}

          {/* Section title */}
          <Pointer gap={2} align={'flex-start'} justify={'flex-start'}>
            <Text as={'p'} size={0} muted>
              H2:
            </Text>
            <Text as={'h2'} size={1}>
              {getTitle(props.title)}
            </Text>
            <Text id={'arrow'} size={1}>
              →
            </Text>
          </Pointer>
        </Card>

        {/* Body */}
        {hasBody(props) && isArray(props.body) && props.body?.length > 0 && (
          <Stack space={4} id={'body'}>
            {(props.body as BodyHeader[]).map((block) => {
              // * Get the path to the block
              const blockPath =
                block._type === 'block'
                  ? [...sectionBodyPath, { _key: block._key }]
                  : block._type === 'buttons'
                    ? [...sectionBodyPath, { _key: block._key }, 'buttons']
                    : [...sectionBodyPath, { _key: block._key }, 'title']
              // get indentation based on style
              const indentation = getIndentation(block)
              const blockTypeTitle = bodyType?.of?.find(
                (type) => type.name === block._type,
              )?.title
              return (
                <Card
                  onClick={() => props.handleOpen(blockPath)}
                  marginX={
                    block.style
                      ? indentation
                      : getNestedIndentation(block, props.body as BodyHeader[])
                  }
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
                      size={block._type === 'block' ? 1 : 0}
                      muted={Boolean(!block.style)}
                      style={{
                        fontStyle: block.style ? 'inherit' : 'italic',
                      }}
                    >
                      {block.style
                        ? block.text
                        : `${blockTypeTitle || capitaliseFirstLetter(block._type)}`}
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

        {/* Arrays: Link & Accordion */}
        {hasProperty(props, 'links') && (
          <Stack space={3} id={'links'}>
            {(props as FurtherLinkSection).links?.map((link) => {
              const linkCardPath = [
                'content',
                { _key: props._key },
                'links',
                { _key: link._key },
                'title',
              ]

              return (
                <Card
                  onClick={() => props.handleOpen(linkCardPath)}
                  marginX={getIndentation(props) + 3}
                  paddingLeft={2}
                  paddingBottom={1}
                >
                  <Pointer
                    marginLeft={3}
                    gap={2}
                    align={'center'}
                    justify={'flex-start'}
                  >
                    <Text as={'p'} size={0} muted>
                      <VscLinkExternal
                        style={{
                          fontSize: '10px',
                          fontWeight: 200,
                        }}
                      />
                    </Text>
                    <Text
                      as={'p'}
                      size={0}
                      muted
                      style={{
                        fontStyle: 'italic',
                      }}
                    >
                      {getTitle(link.title)}
                    </Text>
                    <Text id={'arrow'} size={1}>
                      →
                    </Text>
                  </Pointer>
                </Card>
              )
            })}
          </Stack>
        )}
        {hasProperty(props, 'accordion') && (
          <Stack space={3} id={'accordion'}>
            {(props as AccordionSection).accordion?.map((accordionItem) => {
              const accordionItemPath = [
                'content',
                { _key: props._key },
                'accordion',
                { _key: accordionItem._key },
                'title',
              ]

              return (
                <Card
                  onClick={() => props.handleOpen(accordionItemPath)}
                  marginX={getIndentation(props) + 3}
                  paddingLeft={2}
                  paddingBottom={1}
                >
                  <Pointer
                    marginLeft={3}
                    gap={2}
                    align={'center'}
                    justify={'flex-start'}
                  >
                    <Text as={'p'} size={0} muted>
                      <VscTriangleRight
                        style={{
                          fontSize: '10px',
                          fontWeight: 200,
                        }}
                      />
                    </Text>
                    <Text
                      as={'p'}
                      size={0}
                      muted
                      style={{
                        fontStyle: 'italic',
                      }}
                    >
                      {getTitle(accordionItem.title)}
                    </Text>
                    <Text id={'arrow'} size={1}>
                      →
                    </Text>
                  </Pointer>
                </Card>
              )
            })}
          </Stack>
        )}
      </StackWithBorder>
    </Tooltip>
  )
}
const StackWithBorder = styled(Stack)`
  border-bottom: 1px solid var(--card-hairline-hard-color);
  width: 100%;
`
export default ContentSection
