import { Box, Card, Text, Tooltip } from '@sanity/ui'
import { toPlainText } from 'next-sanity'
import { FunctionComponent } from 'react'
import {
  ArraySchemaType,
  ObjectSchemaType,
  Path,
  PortableTextBlock,
  isString,
} from 'sanity'
import { getEmbeddedFields } from '../utils/getEmbeddedFields'
import { Section } from './InspectorBody'
import Pointer from './Pointer'
import SectionFieldsRenderer from './SectionFieldsRenderer'

export interface SectionRendererProps {
  fieldValue: PortableTextBlock[] | unknown[]
  fieldSchemaType: ArraySchemaType<unknown>
  fieldPath: Path
  fieldNames: string[]
  handleOpen: (path: Path) => void
}

export const SectionRenderer: FunctionComponent<SectionRendererProps> = (
  props,
) => {
  const { fieldValue, fieldSchemaType, fieldPath, fieldNames, handleOpen } =
    props

  return fieldValue.map((section: Section) => {
    // find the title of the section
    const sectionTitle = fieldSchemaType.of.find(
      (ofType) => ofType.name === section._type,
    )?.title
    const title = isString(section.title)
      ? section.title
      : toPlainText(section.title!) || sectionTitle

    // Section path
    const sectionPath = fieldPath.concat([{ _key: section._key }])
    const sectionTitlePath = sectionPath.concat(['title'])
    const sectionSchemaType = fieldSchemaType.of.find(
      (ofType) => ofType.name === section._type,
    ) as ObjectSchemaType

    // find the embedded fields in section object which match the otherFields array entries returning an array of objects
    const embeddedFields = getEmbeddedFields(section, fieldNames)

    return (
      <>
        <Card
          onClick={() => handleOpen(sectionTitlePath)}
          paddingLeft={2}
          paddingBottom={1}
          as="li"
          key={section._key}
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
            {/*
             * * * * * SECTION HEADINGS * * * * *
             */}
            <Pointer gap={2} align={'flex-start'} justify={'flex-start'}>
              <Text size={0} muted>
                H2:
              </Text>
              {/*
               * * * TITLE * * *
               */}
              <Text
                size={1}
                muted={Boolean(!section.title)}
                style={{
                  fontStyle: section.title ? 'inherit' : 'italic',
                }}
              >
                {title}
              </Text>
              <Text id={'arrow'} size={1}>
                →
              </Text>
            </Pointer>
          </Tooltip>
        </Card>
        {/*
         * * * * * EMBEDDED FIELDS * * * * *
         */}
        {embeddedFields && embeddedFields.length > 0 && (
          <SectionFieldsRenderer
            embeddedFields={embeddedFields}
            sectionPath={sectionPath}
            handleOpen={handleOpen}
            fieldNames={fieldNames}
            fieldSchemaType={fieldSchemaType}
            sectionSchemaType={sectionSchemaType}
            // debugging
            sectionTitle={sectionTitle!}
          />
        )}
      </>
    )
  })
}
