/** ### Type Guard Function: 
 * The `hasBody` function checks if the body property exists on the given section. 
 * 
 * This function returns true if the body property exists, and false otherwise.
 * 
 * @param {SectionType} section - The section to check for the body property.
 * @returns True if the body property exists, and false otherwise.

 */
export const hasBody = (section: any): section is { body: string } => {
  return 'body' in section
}

/** ### Type Guard Function:
 * The `hasProperty` function checks if the given property exists on the given object.
 */
export const hasProperty = (
  object: any,
  property: string,
): object is { [key: string]: any } => {
  return property in object
}
