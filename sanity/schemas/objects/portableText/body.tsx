import { defineArrayMember, defineType } from 'sanity'
import {
  validateH2IsFirst,
  validateHeadingOrder,
  warnWhenHeadingOrBlockIsAllBold,
} from './validations'

// TODO: ADD blocks, annotations, decorators etc. and add TS docs for them
/** ## `body` Type - Portable Text
 *
 * Used for the main body of text on the website.
 *
 * @name body
 * @type {PortableTextBlock[]}
 * @validation {Rule} - TODO: Add validation
 *
 * ### Blocks
 * - **Decorators**: TODO: Add decorators
 * - **Annotations**: TODO: Add annotations
 * - **Styles**: `normal`, `h2`, `h3`, `h4`, `h5`, `h6`, `blockquote`, `small`
 * - **Lists**: `bullet`, `number`
 *
 */
export default defineType({
  name: 'body',
  title: 'Body',
  type: 'array',
  validation: (rule) => [validateH2IsFirst(rule), validateHeadingOrder(rule)],
  of: [
    defineArrayMember({
      type: 'block',
      validation: (rule) => [warnWhenHeadingOrBlockIsAllBold(rule)],
      marks: {
        // annotations: [],
        // decorators: [],
      },
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
        { title: 'Small', value: 'small' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
    }),

    // * IMAGE BLOCK
    defineArrayMember({
      name: 'imageBlock',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    // TODO: Add buttons, testimonial and publication blocks

    // * BUTTONS BLOCK
    // * TESTIMONIAL BLOCK
    // * PUBLICATION BLOCK
  ],
})
