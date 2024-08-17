import { BodyHeader } from '../TableOfContents'

// * Heading indentation based on style
export const getIndentation = (block: BodyHeader) =>
  block.style?.startsWith('h')
    ? // h2 has no indentation
      Number(block.style?.slice(1)) === 2
      ? 0
      : // all other indentations match the heading level
        Number(block.style?.slice(1))
    : 0

/** ### Function: `getNestedIndentation`
 *
 * Get the nesting level of non-heading blocks based on the previous heading blocks style property
 *
 * @param block
 * @param body
 * @returns
 */
export const getNestedIndentation = (block: BodyHeader, body: BodyHeader[]) => {
  // find index of current block in the body array based on the _key
  const blockIndex = body.findIndex((b) => b._key === block._key)

  const findPreviousHeadingStyle = (index: number) => {
    for (let i = index; i >= 0; i--) {
      if (body[i].style?.startsWith('h')) {
        return Number(body[i].style?.slice(1)) + 2
      }
    }
    return 3
  }

  return findPreviousHeadingStyle(blockIndex)
}
