import { capitaliseFirstLetter } from '@/sanity/lib/utils/capitaliseFirstLetter'
import { Box, Card, Stack, Text, Tooltip } from '@sanity/ui'
import { toPlainText } from 'next-sanity'
import { FunctionComponent } from 'react'
import {
  ArraySchemaType,
  ObjectSchemaType,
  Path,
  PortableTextBlock,
  PortableTextTextBlock,
  isArray,
  isPortableTextTextBlock,
  pathToString,
} from 'sanity'
import { isPortableText } from '../../utils/isPortableText'
import { getNestedIndentation } from '../utils/getIndentation'
import EmbeddedFieldsRenderer from './EmbeddedFieldsRenderer'
import Pointer from './Pointer'

export interface SectionFieldsRendererProps {
  fieldSchemaType: ArraySchemaType<unknown>
  fieldNames: string[]
  sectionPath: Path
  embeddedFields: { field: string; value: unknown[] | PortableTextBlock[] }[]
  handleOpen: (path: Path) => void
  sectionTitle: string
  sectionSchemaType: ObjectSchemaType
}

const SectionFieldsRenderer: FunctionComponent<SectionFieldsRendererProps> = (
  props,
) => {
  const {
    embeddedFields,
    fieldSchemaType,
    sectionPath,
    fieldNames,
    handleOpen,
    sectionTitle,
    sectionSchemaType,
  } = props
  // console.log('* * EMBEDDED FIELDS * *', embeddedFields)
  return embeddedFields.map((field) => {
    // * * Portable Text field
    if (isArray(field.value) && isPortableText(field.value)) {
      const fieldNamePTE = field.field
      const blocks = field.value as PortableTextBlock[]

      // filter out headings and custom blocks
      const headingsAndCustomBlocks = blocks.filter(
        (block) =>
          (block as PortableTextTextBlock).style?.startsWith('h') ||
          block._type !== 'block',
      )
      // if there are no headings or custom blocks, return null
      if (headingsAndCustomBlocks.length === 0) {
        return null
      }
      const pteSchemaType = sectionSchemaType.fields.find(
        (field) => field.name === fieldNamePTE,
      ) as ArraySchemaType<PortableTextBlock>

      return headingsAndCustomBlocks.map((block) => {
        const indentation = getNestedIndentation(
          block,
          field.value as PortableTextBlock[],
          true,
        )
        const blockSchemaType = (
          pteSchemaType?.type as ArraySchemaType
        )?.of.find((ofType) => ofType.name === block._type) as ObjectSchemaType
        const blockSchemaTitle =
          blockSchemaType?.title || capitaliseFirstLetter(block._type)
        const blockPath =
          block._type === 'block'
            ? sectionPath.concat([fieldNamePTE, { _key: block._key }])
            : (sectionPath.concat([
                fieldNamePTE,
                { _key: block._key },
                'title',
              ]) as Path)

        return (
          <Card
            onClick={() => handleOpen(blockPath)}
            marginLeft={indentation}
            paddingLeft={2}
            paddingBottom={1}
            as="li"
          >
            <Pointer gap={2} align={'center'} justify={'flex-start'}>
              {/*
               * * * * * H INDICATOR * * * * *
               */}
              {isPortableTextTextBlock(block) && block.style && (
                <Text size={0} muted>
                  {capitaliseFirstLetter(block.style as string)}:
                </Text>
              )}
              {/*
               * * * * * TITLE * * * * *
               */}
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
                    ? `${blockSchemaTitle} - ${toPlainText((block as any).body).substring(0, 60)} ...`
                    : `${blockSchemaTitle}`}
              </Text>
              <Text id={'arrow'} size={1}>
                →
              </Text>
            </Pointer>
          </Card>
        )
      })
    }
    // * * Array field
    if (!isPortableText(field.value) && isArray(field.value)) {
      const fieldNameArray = field.field
      const arraySchemaType = sectionSchemaType.fields.find(
        (field) => field.name === fieldNameArray,
      ) as ArraySchemaType<unknown>
      const fieldValueArray = field.value as unknown[]
      const arraySchemaTypeTitle =
        arraySchemaType?.title || capitaliseFirstLetter(fieldNameArray)

      const fieldPath = sectionPath.concat([fieldNameArray]) as Path

      return (
        <Stack as="ul" space={2} paddingX={3}>
          <Card
            onClick={() => handleOpen(fieldPath)}
            paddingLeft={4}
            paddingBottom={1}
            as="li"
            key={pathToString(fieldPath)}
          >
            {/*
             * * * TOOL TIP * * *
             */}
            <Tooltip
              content={
                <Box padding={2}>
                  <Text size={1}>{sectionTitle}</Text>
                </Box>
              }
              placement="top"
            >
              <Pointer gap={2} align={'flex-start'} justify={'flex-start'}>
                {/*
                 * * * TITLE * * *
                 */}
                <Text
                  size={0}
                  muted={true}
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  {arraySchemaTypeTitle}
                </Text>
                <Text id={'arrow'} size={1}>
                  →
                </Text>
              </Pointer>
            </Tooltip>
          </Card>
          <EmbeddedFieldsRenderer
            arraySchemaTypeTitle={arraySchemaTypeTitle}
            fieldPath={fieldPath}
            fieldValue={fieldValueArray}
            handleOpen={handleOpen}
          />
        </Stack>
      )
    }

    return (
      <Card tone="critical" shadow={1}>
        <Text muted size={0} style={{ fontStyle: 'italic' }}>
          Oh oh... something went wrong.
        </Text>
      </Card>
    )
  })
}
export default SectionFieldsRenderer
