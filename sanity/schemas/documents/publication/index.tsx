import { CharacterCountInputPTE } from '@/sanity/components/inputs/CharacterCount'
import { BookIcon } from '@sanity/icons'
import { defineField, defineType, ReferenceValue } from 'sanity'

export default defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  icon: BookIcon,
  groups: [
    {
      name: 'general',
      title: 'General Info (SEO)',
    },
    {
      name: 'settings',
      title: 'Site Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Publication Title',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'text',
      validation: (Rule) => Rule.required(),
      rows: 2,
      group: 'general',
    }),
    defineField({
      name: 'description',
      description: 'Short Extract that will be displayed on the site.',
      title: 'Description',
      type: 'reducedBody',
      validation: (Rule) => Rule.required().max(500),
      components: {
        input: CharacterCountInputPTE,
      },
      group: 'general',
    }),

    defineField({
      name: 'pubYear',
      title: 'Publishing Year',
      type: 'number',
      options: {
        layout: 'dropdown',
        list: Array.from({ length: 80 }, (_, i) => ({
          title: String(new Date().getFullYear() + 30 - i),
          value: new Date().getFullYear() + 30 - i,
        })),
      },

      initialValue: Number(new Date().getFullYear()),
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'settings',
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Link to Publication',
      description: 'Link to publication if it is published elsewhere',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (value) return true
          if ((context.parent as { file: ReferenceValue })?.file) return true
          return 'Either a URL or a file is required'
        }),
    }),
    defineField({
      type: 'file',
      title: `OR: File for download`,
      name: 'file',
      description: 'Upload a file for download, if there is one.',
      group: 'general',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'authors',
      media: 'icon',
    },
  },
})
