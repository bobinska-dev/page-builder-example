import { BodyHeader } from '../TableOfContents'

export const findPreviousHeading = (block: BodyHeader, body: BodyHeader[]) => {
  // find index of current block in the body array based on the _key
  const blockIndex = body.findIndex((b) => b._key === block._key)
  for (let i = blockIndex; i >= 0; i--) {
    if (body[i].style?.startsWith('h')) {
      return Number(body[i].style?.slice(1)) + 2
    }
  }
  return 3
}
