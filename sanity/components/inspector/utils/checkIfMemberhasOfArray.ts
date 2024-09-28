import { ArraySchemaType, SchemaType } from 'sanity'

/** ### Function: `hasOfProperty`
 *
 * Check if the schemaType has an `of` property
 *
 * @param schemaType
 * @returns true/false
 */
export function hasOfProperty(schemaType: SchemaType): schemaType is ArraySchemaType {
  return (schemaType as ArraySchemaType).of !== undefined
}
