import { LaunchIcon } from '@sanity/icons'
import { defineField, defineType, Rule } from 'sanity'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  description: 'Button for external, internal, functional or file link',
  icon: LaunchIcon,
  fields: [
    // Button Text
    defineField({
      title: 'Button Text',
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    }),
    // Button Type
    defineField({
      title: 'Button Type',
      name: 'type',
      type: 'string',
      description:
        'Choose where this link will point to: a place inside the website, an external link or a file for downloading. Or choose a functional button like a contact form.',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' },
          { title: 'Functional', value: 'functional' },
          { title: 'File', value: 'file' },
        ],
      },
    }),
    // Button Link External
    defineField({
      title: 'Link External',
      name: 'linkExternal',
      type: 'url',
      hidden: ({ parent, value }) => parent?.type !== 'external',
      validation: (Rule) => [
        Rule.uri({
          allowRelative: false,
          scheme: ['https', 'mailto', 'tel'],
        }),
        Rule.custom((value, context) => {
          const { type } = context.parent as { type: string }
          if (type === 'external' && !value) {
            return 'External link is required'
          }
          return true
        }),
      ],
    }),

    // Button Link Internal
    defineField({
      title: 'Link Internal',
      name: 'linkInternal',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'news' }, { type: 'publication' }],
      hidden: ({ parent, value }) => parent?.type !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { type } = context.parent as { type: string }
          if (type === 'internal' && !value) {
            return 'Internal link is required'
          }
          return true
        }),
    }),

    // File Button
    defineField({
      title: 'File',
      name: 'file',
      type: 'file',
      description: 'Button for file-download',
      hidden: ({ parent, value }) => parent?.type !== 'file',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { type } = context.parent as { type: string }
          if (type === 'file' && !value) {
            return 'File is required'
          }
          return true
        }),
    }),

    // Functional Button
    defineField({
      title: 'Function',
      name: 'functional',
      type: 'string',
      description:
        'Choose a functional button to navigate people to specific forms or applications.',
      hidden: ({ parent, value }) => parent?.type !== 'functional',
      options: {
        list: [
          { title: 'Contact Form', value: 'contact' },
          { title: 'Newsletter Subscription', value: 'subscribe' },
        ],
        layout: 'radio',
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { type } = context.parent as { type: string }
          if (type === 'functional' && !value) {
            return 'Functional link is required'
          }
          return true
        }),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
    prepare({ title, subtitle }) {
      return {
        title: title,
        subtitle: subtitle,
        media: LaunchIcon,
      }
    },
  },
})
