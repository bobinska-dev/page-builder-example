import { ForbiddenLocationPTE } from '@/types'
import {
  ArrayRule,
  BlockRule,
  isPortableTextSpan,
  isPortableTextTextBlock,
  PortableTextBlock,
  PortableTextSpan,
  PortableTextTextBlock,
} from 'sanity'

// * * Block level validations for Portable Text * *

/** ## Validation for H2 is First Heading
 *
 * Validates whether the first heading is an h2, because H1 will be the document title.
 *
 */
export const validateH2IsFirst = (
  Rule: ArrayRule<PortableTextBlock[] | unknown[]>,
) =>
  Rule.custom((value, context) => {
    const { path } = context
    if (path && value) {
      // get all headings
      const headings = value.filter(
        (block: PortableTextBlock) =>
          block._type == 'block' &&
          (block.style as PortableTextTextBlock['style'])?.startsWith('h'),
      ) as PortableTextTextBlock[]

      if (headings.length && headings[0].style !== 'h2')
        return {
          message: 'First heading should be h2.',
          path: [{ _key: headings[0]._key }],
        }
      return true
    }

    return true
  })

/** ## Validation for Heading Order
 *
 * Validates whether headings are in the correct order, especially when descending.
 *
 */
export const validateHeadingOrder = (
  Rule: ArrayRule<PortableTextBlock[] | unknown[]>,
) =>
  Rule.custom((value, context) => {
    const { path } = context
    // * Validate Headings
    if (path && value) {
      // get all headings
      const headings = value.filter(
        (block: PortableTextBlock) =>
          block._type == 'block' &&
          (block.style as PortableTextTextBlock['style'])?.startsWith('h'),
      ) as PortableTextTextBlock[]

      // Validate if headings are in order when descending
      if (headings.length > 1) {
        for (let i = 0; i < headings.length - 1; i++) {
          const current = headings[i]
          const next = headings[i + 1]

          if (current.style && next.style) {
            const currentLevel = parseInt(current.style.replace('h', ''))
            const nextLevel = parseInt(next.style.replace('h', ''))

            if (currentLevel < nextLevel && nextLevel - currentLevel > 1) {
              return {
                message: `Heading ${current.style} should not be followed by heading ${next.style}. Please use heading ${currentLevel + 1} instead.`,
                path: [{ _key: next._key }],
              }
            }
          }
        }
      }

      return true
    }

    return true
  })

//  * * Inline level validations for Portable Text * *

// * Warnings
/** ## Validation on text block level:
 *
 * Warn when block is all bold -> Suggestion to make it a heading instead
 *
 * Warn when heading is all bold -> Suggestion to remove strong
 *
 */
export const warnWhenHeadingOrBlockIsAllBold = (Rule: BlockRule) =>
  Rule.warning().custom((value, context) => {
    const { path } = context
    const locations: ForbiddenLocationPTE[] = []
    // * Validate if whole block is styled as strong
    if (path && isPortableTextTextBlock(value)) {
      // check if the block has only one child and if it is a span
      const hasOneChild = value.children.length === 1
      const childIsSpan = hasOneChild
        ? isPortableTextSpan(value.children[0])
        : false
      // check if block is heading
      const isHeading = value.style?.startsWith('h')

      const child = childIsSpan
        ? (value.children[0] as PortableTextSpan)
        : undefined
      // check if the child is styled as strong
      const strong = child?.marks?.some((mark) => mark === 'strong')

      // if the block is styled as strong and the child is a span, add a warning
      if (strong && childIsSpan && !isHeading) {
        locations.push({
          span: value[0] as PortableTextSpan,
          matchText: '',
          path: path.concat(['children', { _key: value._key }]),
          offset: 0,
          message: 'Did you want to make this a heading?',
          level: 'warning',
        })
      }

      // if block is heading and strong, warn to remove strong
      if (strong && childIsSpan && isHeading) {
        locations.push({
          span: value[0] as PortableTextSpan,
          matchText: '',
          path: path.concat(['children', { _key: value._key }]),
          offset: 0,
          message: 'Headings should not be styled as strong.',
          level: 'warning',
        })
      }
    }

    if (locations.length) {
      return {
        message: `${locations.map((item) => item.message).join('. ')}`,
      }
    }
    return true
  })

/** ## Warn when whole block is all bold -> Suggestion to make it a heading instead
 */
export const warnWhenBlockIsAllBold = (Rule: BlockRule) =>
  Rule.warning().custom((value, context) => {
    const { path } = context
    const locations: ForbiddenLocationPTE[] = []

    // * Validate if whole block is styled as strong
    if (path && isPortableTextTextBlock(value)) {
      // check if the block has only one child and if it is a span
      const hasOneChild = value.children.length === 1
      const childIsSpan = hasOneChild
        ? isPortableTextSpan(value.children[0])
        : false
      // check if block is heading
      const isHeading = value.style?.startsWith('h')

      const child = childIsSpan
        ? (value.children[0] as PortableTextSpan)
        : undefined
      // check if the child is styled as strong
      const strong = child?.marks?.some((mark) => mark === 'strong')

      // if the block is styled as strong and the child is a span, add a warning
      if (strong && childIsSpan && !isHeading) {
        locations.push({
          span: value[0] as PortableTextSpan,
          matchText: '',
          path: path.concat(['children', { _key: value._key }]),
          offset: 0,
          message: 'Did you want to make this a heading?',
          level: 'warning',
        })
      }
    }
    if (locations.length) {
      return {
        message: `${locations.map((item) => item.message).join('. ')}.`,
      }
    }
    return true
  })
