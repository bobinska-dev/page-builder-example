import TextSectionPreview from '@/sanity/components/sections/previews/TextSectionPreview'
import { BlockContentIcon } from '@sanity/icons'
import { SchemaValidationValue, defineField, defineType } from 'sanity'
import {
  validateH3IsFirst,
  validateHeadingOrder,
  validateNoH2,
} from '../../validations/portableTextValidations'

export default defineType({
  name: 'textSection',
  title: 'RichText Section',
  type: 'object',
  icon: BlockContentIcon,
  components: {
    preview: TextSectionPreview,
  },
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      body: 'body',
      media: 'icon',
    },
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
    // * * * Subtitle * * *
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'overview',
      description:
        'This will be used as the H2 of the Sections. Short and on point – max. 200',
      validation: (Rule) => Rule.max(200),
    }),

    // * * * Body * * *
    defineField({
      name: 'body',
      title: 'Body',
      type: 'body',
      validation: (Rule) => [
        Rule.required(),
        //* Validate if there is no h2 in the body of text Sections
        validateNoH2(Rule) as SchemaValidationValue,
        // * Validate if first heading is h3
        validateH3IsFirst(Rule) as SchemaValidationValue,
        // * Validate if headings are in order when descending
        validateHeadingOrder(Rule) as SchemaValidationValue,
      ],
    }),
  ],
})
