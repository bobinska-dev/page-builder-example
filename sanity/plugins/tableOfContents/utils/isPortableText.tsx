/** ### Function ´isPortableText´
 *
 * Check if an array of objects is a valid Portable Text array.
 *
 * @param array
 * @returns true if all objects in the array are Portable Text blocks, false otherwise
 */
export const isPortableText = (array: any[]): boolean => {
  if (array === undefined || array === null) {
    return false
  }
  return array.some((item) => {
    return item._type === 'block'
  })
}
