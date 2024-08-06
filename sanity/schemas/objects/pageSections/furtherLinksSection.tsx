import FurtherLinkSectionPreview from '@/sanity/components/sections/previews/FurtherLinkSectionPreview'
import { TagsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'furtherLinkSection',
  title: 'Further Link Section',
  type: 'object',
  icon: TagsIcon,
  preview: {
    select: {
      title: 'title',
      body: 'body',
      links: 'links',
      media: 'icon',
    },
  },
  components: {
    preview: FurtherLinkSectionPreview,
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

    // * * * Body * * *
    defineField({
      name: 'body',
      title: 'Body',
      type: 'body',
    }),

    // * * * links * * *
    defineField({
      name: 'links',
      title: 'List of Links',
      type: 'array',
      of: [{ type: 'linkCard' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
