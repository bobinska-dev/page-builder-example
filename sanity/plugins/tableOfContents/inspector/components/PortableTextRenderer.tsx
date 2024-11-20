import { capitaliseFirstLetter } from '@/sanity/lib/utils/capitaliseFirstLetter'
import { Card, Text } from '@sanity/ui'
import { toPlainText } from 'next-sanity'
import { FunctionComponent } from 'react'
import {
  ArraySchemaType,
  Path,
  PortableTextBlock,
  PortableTextTextBlock,
  isPortableTextTextBlock,
} from 'sanity'
import { getNestedIndentation } from '../utils/getIndentation'
import Pointer from './Pointer'

interface PortableTextRendererProps {
  fieldValue: PortableTextBlock[] | unknown[]
  fieldSchemaType: ArraySchemaType<unknown>
  fieldPath: Path
  handleOpen: (path: Path) => void
}
const PortableTextRenderer: FunctionComponent<PortableTextRendererProps> = (
  props,
) => {
  const { fieldValue, fieldSchemaType, fieldPath, handleOpen } = props
  return fieldValue
    .filter(
      (block) =>
        (block._type === 'block' &&
          (block as PortableTextTextBlock).style?.startsWith('h')) ||
        block._type !== 'block',
    )
    .map((block: PortableTextBlock) => {
      // * Preparation
      const indentation = getNestedIndentation(
        block,
        fieldValue as PortableTextBlock[],
      )
      const customBlockTitle = fieldSchemaType.of.find(
        (ofType) => ofType.name === block._type,
      )?.title
      const blockPath = fieldPath.concat([{ _key: block._key }])

      return (
        <Card
          onClick={() => handleOpen(blockPath)}
          marginLeft={indentation}
          paddingLeft={2}
          paddingBottom={1}
          as="li"
          key={block._key}
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
                  ? `${customBlockTitle} - ${toPlainText((block as any).body).substring(0, 60)} ...`
                  : `${customBlockTitle}`}
            </Text>
            <Text id={'arrow'} size={1}>
              →
            </Text>
          </Pointer>
        </Card>
      )
    })
}
export default PortableTextRenderer
