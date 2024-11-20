import { Card, Stack, Text } from '@sanity/ui'
import { ComponentType, useCallback } from 'react'
import { FieldMember, Path, PortableTextBlock } from 'sanity'
import { useDocumentPane } from 'sanity/structure'
import { TableOfContentsPluginOptions } from '../../tableOfContentsPlugin'
import FieldRenderer from './FieldRenderer'

export interface Section {
  _key: string
  _type: string
  title?: string | PortableTextBlock[]
  [key: string]: unknown
}
export interface InspectorBodyProps {
  config: TableOfContentsPluginOptions
  onClose: () => void
  documentId: string
  documentType: string
}
const InspectorBody: ComponentType<InspectorBodyProps> = (props) => {
  const { config } = props

  // * HOOKS
  const { onFocus, onPathOpen, formState } = useDocumentPane()
  // * Open nested buttons input dialog on click
  const handleOpen = useCallback(
    (path: Path) => {
      onPathOpen(path)
      onFocus(path)
    },
    [onFocus, onPathOpen],
  )
  // * MISC
  const fieldNames = config.fieldNames
  const documentValue = formState?.value

  // * Get the content field members
  const contentFieldMembers = formState?.members.filter((member: FieldMember) =>
    fieldNames.includes(member.field.id),
  ) as FieldMember[]

  return (
    <Card flex={1} overflow="auto" padding={3} paddingBottom={5}>
      {!documentValue && (
        <Card tone={'caution'}>
          <Text>No content found... </Text>
        </Card>
      )}
      <Stack as="ul" space={3} paddingX={3}>
        <FieldRenderer
          contentFieldMembers={contentFieldMembers}
          fieldNames={fieldNames}
          handleOpen={handleOpen}
        />
      </Stack>
    </Card>
  )
}

export default InspectorBody
