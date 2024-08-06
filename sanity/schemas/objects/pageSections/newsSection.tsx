import AutomaticSectionPreview from '@/sanity/components/sections/previews/AutomaticSelectionPreview'
import { BellIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'newsSection',
  type: 'object',
  title: 'News Section',
  icon: BellIcon,

  preview: {
    select: {
      title: 'title',
      body: 'body',
      loadAll: 'loadAll',
      news: 'news',
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
    }),

    // * * * Load All Boolean * * *
    defineField({
      name: 'loadAll',
      type: 'boolean',
      title: 'Load All',
      description: 'Load all news automatically',
      options: {
        layout: 'checkbox',
      },
      initialValue: true,
    }),

    // * * *  News Array * * *
    defineField({
      name: 'news',
      title: 'Select individual news items for this section',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'newsItem',
          title: 'News Item',
          type: 'reference',
          to: [{ type: 'news' }],
        }),
      ],
      description:
        'Add news items that you want to display. If you only select one, it will be displayed as featured in a very prominent way.',
      hidden: ({ parent }) => parent?.loadAll,
      validation: (Rule) =>
        Rule.custom((newsArray, context) => {
          if (!newsArray) return true

          if (
            //@ts-ignore
            (!context.parent?.loadAll && newsArray?.length < 1) ||
            !newsArray
          ) {
            return 'Please add at least three news item'
          }

          return true
        }),
    }),
  ],
})
