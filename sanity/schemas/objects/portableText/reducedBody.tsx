import { CharacterCountInputPTE } from '@/sanity/components/inputs/CharacterCount'
import { defineArrayMember, defineType, PortableTextBlock } from 'sanity'
import link from './annotations/link'

// TODO: Add missing annotations and types

/** ## `reducedBody` Type - reduced Portable Text
 *
 * Used where a PTE with reduced options is needed.
 *
 * @name reducedBody
 * @type {PortableTextBlock[]}
 * @validation {Rule} - Required, max 400 characters
 *
 * ### Blocks
 * - **Decorators**: `em`, `strong`
 * - **Annotations**: TODO: Add annotations
 * - **Styles**: `normal`,`h3`, `h4`, `h5`, `h6`, `blockquote`, `small`
 * - **Lists**: `bullet`, `number`
 *
 */
export default defineType({
  name: 'reducedBody',
  title: 'Body',
  type: 'array',
  validation: (Rule) => Rule.required().max(400),
  components: {
    input: CharacterCountInputPTE,
  },
  of: [
    // Paragraphs
    defineArrayMember({
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        annotations: [link],

        decorators: [
          {
            title: 'Italic',
            value: 'em',
          },
          {
            title: 'Strong',
            value: 'strong',
          },
        ],
      },
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
        { title: 'Small', value: 'small' },
      ],
      type: 'block',
    }),
  ],
})
