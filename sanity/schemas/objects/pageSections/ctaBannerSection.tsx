import CtaSectionPreview from '@/sanity/components/sections/previews/ctabannerSectionPreview'
import { InfoOutlineIcon } from '@sanity/icons'
import { toPlainText } from 'next-sanity'
import {
  PortableTextBlock,
  SchemaValidationValue,
  defineField,
  defineType,
} from 'sanity'
import {
  validateH3IsFirst,
  validateHeadingOrder,
  validateNoH2,
} from '../../validations/portableTextValidations'

export default defineType({
  name: 'ctaBannerSection',
  title: 'Call to Action Banner',
  type: 'object',
  icon: InfoOutlineIcon,
  preview: {
    select: {
      title: 'title',
      body: 'body',
      media: 'icon',
    },
    prepare({ title, body, media }) {
      return {
        title: toPlainText(title),
        body,
        media,
      }
    },
  },
  components: {
    preview: CtaSectionPreview,
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
      title: 'Body',
      type: 'body',
      description:
        'Please make sure to add at least one button to the CTA section.',
      validation: (rule) => [
        //* Validate if there is at least one button in the body
        rule.required().custom((body: PortableTextBlock[]) => {
          // get all button sections from the body array
          const buttons = body.filter((block) => block._type === 'buttons')
          // if there are no buttons, return val error string
          if (!buttons.length) {
            return 'Please add at least one button to the CTA section.'
          }
          return true
        }),
        //* Validate if there is no h2 in the body of text Sections
        validateNoH2(rule) as SchemaValidationValue,
        // * Validate if first heading is h3
        validateH3IsFirst(rule) as SchemaValidationValue,
        // * Validate if headings are in order when descending
        validateHeadingOrder(rule) as SchemaValidationValue,
      ],
      initialValue: [
        {
          _type: 'block',
          _key: '290cbcb10100',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'This is a call to action section. Please add a button below.',
            },
          ],
          markDefs: [],
          style: 'normal',
        },
        {
          _type: 'buttons',
          _key: '1aa0c573120a',
          buttons: [
            {
              _type: 'button',
              _key: 'd8532830ff6b',
              linkInternal: {
                _ref: undefined,
                _type: 'reference',
              },
              title: 'Change Me!',
              type: 'internal',
            },
          ],
        },
      ],
    }),
  ],
})
