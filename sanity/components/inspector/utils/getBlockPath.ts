import { Path, PortableTextBlock } from 'sanity'

/** ### Function: `getBlockPath`
 *
 * Get the path of the block in the document
 *
 * @param block PortableTextBlock
 * @param fieldPath Path to field
 * @returns
 */
export const getBlockPath = (block: PortableTextBlock, fieldPath: Path) => {
  if (block._type === 'block') {
    return [...fieldPath, { _key: block._key }]
  }
  if (block._type === 'snippetBlock') {
    return [...fieldPath, { _key: block._key }, 'snippet']
  }
  if (block._type === 'code') {
    return [...fieldPath, { _key: block._key }, 'code']
  }
  if (['proTip', 'gotcha', 'infoBox'].includes(block._type)) {
    return [...fieldPath, { _key: block._key }, 'body']
  }
  if (block._type === 'reusableContentBlock') {
    return [...fieldPath, { _key: block._key }, '_ref']
  }
  return [...fieldPath, { _key: block._key }, 'title']
}
