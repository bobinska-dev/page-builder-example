import { Card, Text } from '@sanity/ui'
import { toPlainText } from 'next-sanity'
import { FunctionComponent } from 'react'
import { Path, PortableTextBlock, isString } from 'sanity'
import { isPortableText } from '../../utils/isPortableText'
import Pointer from './Pointer'

export interface EmbeddedFieldsRendererProps {
  arraySchemaTypeTitle: string
  fieldPath: Path
  fieldValue: unknown[]
  handleOpen: (path: Path) => void
}

const EmbeddedFieldsRenderer: FunctionComponent<EmbeddedFieldsRendererProps> = (
  props,
) => {
  const { fieldValue, fieldPath, arraySchemaTypeTitle, handleOpen } = props

  return fieldValue.map((item: { [key: string]: unknown }) => {
    // get title of the item
    const itemTitle =
      item.title && isString(item.title)
        ? item.title
        : isPortableText(item.title as any)
          ? toPlainText(item.title as PortableTextBlock[])
          : arraySchemaTypeTitle
    // item path
    const itemPath = fieldPath.concat([{ _key: item._key as string }, 'title'])
    return (
      <Card
        onClick={() => handleOpen(itemPath)}
        paddingLeft={5}
        paddingBottom={1}
        as="li"
        key={item._key as string}
      >
        <Pointer gap={2} align={'flex-start'} justify={'flex-start'}>
          {/*
           * * * TITLE * * *
           */}
          <Text
            size={1}
            muted={true}
            style={{
              fontStyle: 'italic',
            }}
          >
            {itemTitle}
          </Text>
          <Text id={'arrow'} size={1}>
            →
          </Text>
        </Pointer>
      </Card>
    )
  })
}
export default EmbeddedFieldsRenderer
