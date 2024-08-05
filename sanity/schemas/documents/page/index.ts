import { VscBrowser } from 'react-icons/vsc'
import { defineField, defineType } from 'sanity'
import { pageSettingsFields } from '../../specialFields/pageSettingsFields'
import { seoFields } from '../../specialFields/seoFields'

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: VscBrowser,

  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'settings',
      title: 'Page Settings',
    },
  ],
  fields: [
    /// * * TITLE * *
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
      group: ['content', 'seo'],
    }),
    // * * SEO FIELDS * *
    ...seoFields,
    // * * PAGE SETTINGS * *
    ...pageSettingsFields,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        subtitle: 'Page',
        title,
        media,
      }
    },
  },
})
