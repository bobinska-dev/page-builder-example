import { PortableTextBlock, PortableTextTextBlock } from 'sanity'

export const getNestedIndentation = (
  block: PortableTextBlock,
  body: PortableTextBlock[],
  isSectionPTE?: boolean,
) => {
  // find index of current block in the body array based on the _key
  const blockIndex = body.findIndex((b) => b._key === block._key)

  const firstHeading = body.filter((block) =>
    (block as PortableTextTextBlock).style?.startsWith('h'),
  )[0]

  const findPreviousHeadingStyle = (index: number) => {
    for (let i = index; i >= 0; i--) {
      if ((body[i] as PortableTextTextBlock).style?.startsWith('h')) {
        return Number((body[i] as PortableTextTextBlock).style?.slice(1)) + 2
      }
    }
    return 3
  }
  if (
    block._type === 'block' &&
    (block as PortableTextTextBlock).style?.startsWith('h')
  ) {
    if (
      !isSectionPTE &&
      (block as PortableTextTextBlock).style === firstHeading.style
    ) {
      return 0
    }

    return Number((block as PortableTextTextBlock).style?.slice(1))
  }

  return findPreviousHeadingStyle(blockIndex)
}
