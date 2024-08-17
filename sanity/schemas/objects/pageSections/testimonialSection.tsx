import AutomaticSectionPreview from '@/sanity/components/sections/previews/AutomaticSelectionPreview'
import { CommentIcon } from '@sanity/icons'
import { defineField, defineType, SchemaValidationValue } from 'sanity'
import { testimonialTags } from '../../documents/testimonial '
import {
  validateH3IsFirst,
  validateHeadingOrder,
  validateNoH2,
} from '../../validations/portableTextValidations'

export default defineType({
  name: 'testimonialSection',
  type: 'object',
  title: 'Testimonial Section',
  icon: CommentIcon,
  preview: {
    select: {
      title: 'title',
      body: 'body',
      loadTags: 'loadTags',
      testimonials: 'testimonials',
      _type: '_type',
    },
  },
  components: {
    preview: AutomaticSectionPreview,
  },
  fields: [
    // * * * Title * * *
    defineField({
      name: 'title',
      type: 'overview',
      description:
        'This will be used as the H2 of the Sections. Short and on point – max. 200',
      options: { initialActive: true },
      validation: (Rule) => Rule.required().max(200),
    }),
    // * * * Body * * *
    defineField({
      name: 'body',
      type: 'body',
      title: 'Body',
      validation: (Rule) => [
        //* Validate if there is no h2 in the body of text Sections
        validateNoH2(Rule) as SchemaValidationValue,
        // * Validate if first heading is h3
        validateH3IsFirst(Rule) as SchemaValidationValue,
        // * Validate if headings are in order when descending
        validateHeadingOrder(Rule) as SchemaValidationValue,
      ],
    }),

    // * * * Load Selection * * *
    defineField({
      name: 'loadTags',
      type: 'array',
      title: 'Load Testimonials Automatically',
      description:
        'Select which testimonials to automatically load (multiple can be selected). You can either decide to automatically load testimonials by tag *or* select individual testimonials in the other field.',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Load all Testimonials', value: 'loadAll' },
          ...testimonialTags,
        ],
      },
      initialValue: ['loadAll'],
      validation: (Rule) =>
        Rule.custom((loadArray, context) => {
          if (!loadArray) return true

          // if all is selected no other options can be selected
          if (loadArray.includes('loadAll') && loadArray.length > 1) {
            return 'Please select only "All" or individual topics, not both'
          }

          return true
        }),
    }),

    // * * * Custom Testimonials * * *
    defineField({
      name: 'testimonials',
      type: 'array',
      title: 'Select your own testimonials to display',
      description: 'Select individual testimonials that you want to display.',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      validation: (Rule) =>
        Rule.custom((testimonialArray, context) => {
          if (!testimonialArray) return true

          if (
            //@ts-ignore
            (!context.parent?.load && testimonialArray?.length < 3) ||
            !testimonialArray
          ) {
            return 'Please add at least three testimonial item'
          }

          return true
        }),
      hidden: ({ parent }) => parent?.loadTags?.length > 0,
    }),
  ],
})
