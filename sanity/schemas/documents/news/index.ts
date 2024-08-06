import { CharacterCountInput } from '@/sanity/components/inputs/CharacterCount'
import { BellIcon } from '@sanity/icons'
import { defineField, defineType, Rule } from 'sanity'
import { pageSettingsFields } from '../../specialFields/pageSettingsFields'
import { seoFields } from '../../specialFields/seoFields'

export default defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  icon: BellIcon,

  groups: [
    { name: 'content', title: 'Content' },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'settings',
      title: 'Site Settings',
    },
  ],
  fields: [
    // * Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    // * Subtitle
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      group: 'content',
      components: {
        input: CharacterCountInput,
      },
      validation: (Rule: Rule) => Rule.required().max(200),
    }),

    // * Body
    defineField({
      name: 'body',
      type: 'body',
      title: 'Body',
      group: 'content',
    }),

    // * * SEO * *
    ...seoFields.filter((field) => field.name !== 'description'),

    // * * Site Settings * *
    ...pageSettingsFields,
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      media: 'image',
    },
  },
})
