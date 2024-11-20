import { Card } from '@sanity/ui'
import { FunctionComponent } from 'react'
import {
  ArraySchemaType,
  BaseFormNode,
  FieldMember,
  Path,
  PortableTextBlock,
  SchemaType,
  isArray,
} from 'sanity'
import PortableTextRenderer from './PortableTextRenderer'
import { SectionRenderer } from './SectionRenderer'

interface FieldRendererProps {
  contentFieldMembers: FieldMember<BaseFormNode<unknown, SchemaType>>[]
  fieldNames: string[]
  handleOpen: (path: Path) => void
}
const FieldRenderer: FunctionComponent<FieldRendererProps> = (props) => {
  const { contentFieldMembers, fieldNames, handleOpen } = props
  return contentFieldMembers.map((member) => {
    const fieldPath = member.field.path
    const fieldSchemaType = member.field.schemaType as ArraySchemaType
    const fieldValue = member.field.value as PortableTextBlock[] | unknown[]

    // * Error when field is not an array
    // only arrays and portable text fields are allowed
    if (!isArray(member.field.value)) {
      console.error(
        `Table Of Content Plugin Error: Field "${member.name}" is not an array.`,
      )
      return (
        <Card tone={'caution'}>
          Error when resolving fields... Please check the console for more
          information.
        </Card>
      )
    }

    // * Portable Text
    // check if schemaType.of has block type
    if (fieldSchemaType.of.some((type) => type.name === 'block')) {
      return (
        <PortableTextRenderer
          fieldPath={fieldPath}
          fieldSchemaType={fieldSchemaType}
          fieldValue={fieldValue}
          handleOpen={handleOpen}
        />
      )
    }

    // * Array of Sections
    // check if schemaType.of has object type
    if (!fieldSchemaType.of.some((type) => type.name === 'block')) {
      return (
        <SectionRenderer
          fieldPath={fieldPath}
          fieldSchemaType={fieldSchemaType}
          fieldValue={fieldValue}
          fieldNames={fieldNames}
          handleOpen={handleOpen}
        />
      )
    }
  })
}
export default FieldRenderer
