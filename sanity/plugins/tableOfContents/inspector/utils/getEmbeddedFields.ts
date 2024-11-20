import { PortableTextBlock } from 'sanity'
import { checkObjectForKeys } from '../../utils/checkObjectForKeys'
import { Section } from '../components/InspectorBody'

export const getEmbeddedFields = (
  section: Section,
  fieldNames: string[],
): undefined | { field: string; value: unknown[] | PortableTextBlock[] }[] => {
  // check if other fields in this section are defined in fieldNames
  const embeddedFields = checkObjectForKeys(section, fieldNames)
  if (embeddedFields.length === 0) {
    return
  }
  return (
    embeddedFields
      // Filter keys that exist in the object
      .filter((key) => key in section)
      // Map them to objects with a single key-value pair
      .map((key) => ({
        field: key,
        value: section[key] as unknown[] | PortableTextBlock[],
      }))
  )
}
