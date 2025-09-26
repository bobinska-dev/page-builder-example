import { BodyFieldWithActions } from '@/sanity/components/fields/BodyFieldWithActions'
import { ButtonsPTItem } from '@/sanity/components/inputs/ButttonsPTinput'
import { ArrowUpIcon, AsteriskIcon, BellIcon, BookIcon, CommentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import NewsAnnotation from '../../documents/news/NewsAnnotation'
import PublicationAnnotation from '../../documents/publication/PublicationAnnotation'
import TestimonialPreview from '../../documents/testimonial /TestimonialPreview'
import {
  validateH2IsFirst,
  validateHeadingOrder,
  warnWhenHeadingOrBlockIsAllBold,
} from '../../validations/portableTextValidations'
import link from './annotations/link'
import { Highlighter } from './decorators/Highleighter'
import { BiggerSizeDecorator } from '@/sanity/schemas/objects/portableText/decorators/BiggerSizeDecorator'

// TODO: ADD blocks, annotations, decorators etc. and add TS docs for them
/** ## `body` Type - Portable Text
 *
 * Used for the main body of text on the website.
 *
 * @name body
 * @type {PortableText[]}
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
  components: {
    field: BodyFieldWithActions,
  },
  validation: (rule) => [validateH2IsFirst(rule), validateHeadingOrder(rule)],
  of: [
    defineArrayMember({
      type: 'block',
      validation: (rule) => [warnWhenHeadingOrBlockIsAllBold(rule)],
      // Inline blocks
      of: [
        defineArrayMember({
          name: 'placeholder',
          type: 'object',
          fields: [
            defineField({
              type: 'string',
              name: 'code',
              title: 'Code',
              options: {
                list: [
                  { title: 'placeholder 1', value: 'placeholder1' },
                  { title: 'placeholder 2', value: 'placeholder2' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          title: 'Placeholder',
          // icon: CodeIcon,
          preview: {
            select: { title: 'code' },
            prepare: (selection) => {
              return {
                title: selection.title ? `${selection.title}` : '(empty)',
              }
            },
          },
        }),
      ],
      marks: {
        annotations: [
          // Link annotation to external and internal pages
          link,
          // Publication annotation
          defineField({
            name: 'publication',
            title: 'Publication Reference',
            type: 'reference',
            icon: BookIcon,
            validation: (Rule) => Rule.required(),
            to: { type: 'publication' },
            components: {
              annotation: PublicationAnnotation,
            },
          }),
          // News Annotation
          defineField({
            name: 'news',
            title: 'News Reference',
            type: 'reference',
            icon: BellIcon,
            validation: (Rule) => Rule.required(),
            components: {
              annotation: NewsAnnotation,
            },
            to: { type: 'news' },
          }),
        ],
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Code', value: 'code'},
          {title: 'Strikethrough', value: 'strike-through'},
          {
            title: 'Highlight',
            value: 'highlight',
            component: Highlighter,
            icon: AsteriskIcon,
          },
          {
            title: 'Bigger Size',
            value: 'bigger',
            icon: ArrowUpIcon,
            component: BiggerSizeDecorator,
          }
        ],
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
      title: 'Image Block',
      type: 'aiImage',
    }),

    // * BUTTONS BLOCK
    defineArrayMember({
      name: 'buttons',
      title: 'Buttons',
      type: 'object',
      fields: [
        defineField({
          name: 'buttons',
          title: 'Buttons',
          description:
            'Add buttons to the text instead of just links, to make them stand out more.',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'button',
              title: 'Button',
              type: 'button',
            }),
          ],
          validation: (Rule) => Rule.min(1),
        }),
      ],
      components: {
        block: ButtonsPTItem,
      },
    }),

    // * TESTIMONIAL BLOCK
    defineArrayMember({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'reference',
      icon: CommentIcon,
      to: [
        {
          type: 'testimonial',
        },
      ],
      components: {
        preview: TestimonialPreview,
      },
    }),

    // * PUBLICATION BLOCK
    // TODO: Decide whether to add a publication block or not
  ],
})
