import { ComponentType } from 'react'
import { ArrayOfObjectsInputProps, ObjectItem } from 'sanity'

/** ### Custom Input Component for our Content Array
 *
 * This component will filter out the header sections (text and hero header)
 * from the possible schema types that can be added through the "Add item..." button.
 *
 * This is to prevent the user from adding multiple header sections to the page,
 * in addition to the validation.
 */
const FilteredSectionsArrayInput: ComponentType<
  ArrayOfObjectsInputProps<ObjectItem>
> = (props) => {
  const { value, renderDefault } = props

  // check if the array has a header section
  const hasHeader = value
    ? value.some(
        (item) =>
          item._type === 'heroSection' || item._type === 'headerSection',
      )
    : false

  return renderDefault({
    ...props,
    schemaType: {
      ...props.schemaType,
      // filter out the header section from the array of possible SchemaTypes that can be added to the Content Array, IF the array already has a header section
      of: hasHeader
        ? props.schemaType.of.filter(
            ({ name }) => name !== 'headerSection' && name !== 'heroSection',
          )
        : props.schemaType.of,
    },
  })
}

export default FilteredSectionsArrayInput
