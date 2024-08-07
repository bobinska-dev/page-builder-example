import FilteredSectionsArrayInput from '@/sanity/components/inputs/FilteredSectionsArrayInput'
import { defineArrayMember, defineField } from 'sanity'
import {
  headersAreOnTopValidation,
  onlyOneHeaderValidation,
} from '../validations/contentArrayValidation'

/** ###  Content Array Field
 *
 * Content Array Field is an array of different page builder sections
 *
 * - Image Header Section
 * - Text Header Section
 * - Text Section
 * - Accordion Section
 * - Further Link Section
 * - CTA
 * - News Gallery
 * - Testimonial Gallery
 *
 */
export const pageBuilderArrayField = defineField({
  name: 'content',
  title: 'Content',
  type: 'array',
  group: 'content',

  validation: (Rule) => [
    Rule.required(),
    onlyOneHeaderValidation(Rule),
    headersAreOnTopValidation(Rule),
  ],

  options: {
    treeEditing: true,
    insertMenu: {
      filter: true,
      // TODO: Add views and groups
      showIcons: true,
    },
  },

  components: {
    input: FilteredSectionsArrayInput,
  },

  of: [
    defineArrayMember({ type: 'textHeaderSection' }),
    defineArrayMember({ type: 'imageHeaderSection' }),
    defineArrayMember({ type: 'textSection' }),
    defineArrayMember({ type: 'ctaBannerSection' }),
    defineArrayMember({ type: 'furtherLinkSection' }),
    defineArrayMember({ type: 'accordionSection' }),
    defineArrayMember({ type: 'testimonialSection' }),
    defineArrayMember({ type: 'newsSection' }),
  ],
})
