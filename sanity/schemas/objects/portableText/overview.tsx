import { CharacterCountInputPTEreducedHeight } from '@/sanity/components/inputs/CharacterCount'
import { defineArrayMember, defineType, PortableTextBlock } from 'sanity'

/** ## `overview` Type - reduced Portable Text
 *
 * Used both for the <meta> description tag for SEO, and the personal website subheader.
 * The height of the input is reduced to 2 lines.
 *
 * @name overview
 * @type {PortableTextBlock[]}
 * @validation {Rule} - Required, max 280 characters
 * @description Used both for the <meta> description tag for SEO, and the personal website subheader.
 *
 * ### Blocks
 * - **Decorators**: `em`, `strong`
 * - **Annotations**: none
 * - **Styles**: none
 * - **Lists**: none
 *
 *
 */
export default defineType({
  name: 'overview',
  description: 'Short and on point – max. 280',
  title: 'Meta & SEO Description',
  type: 'array',
  validation: (Rule) => Rule.required().max(280),
  components: {
    input: CharacterCountInputPTEreducedHeight,
  },
  of: [
    // Paragraphs
    defineArrayMember({
      lists: [],
      marks: {
        annotations: [],
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
      styles: [],
      type: 'block',
    }),
  ],
})
