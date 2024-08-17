import TextHeaderSectionPreview from '@/sanity/components/sections/previews/TextHeaderSectionPreview'
import { TextIcon } from '@sanity/icons'
import { defineField, defineType, SchemaValidationValue } from 'sanity'
import {
  validateH3IsFirst,
  validateHeadingOrder,
  validateNoH2,
} from '../../validations/portableTextValidations'

export default defineType({
  name: 'textHeaderSection',
  title: 'Text Header',
  type: 'object',
  icon: TextIcon,
  components: {
    preview: TextHeaderSectionPreview,
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
      type: 'body',
      name: 'body',
      title: 'Body',
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
