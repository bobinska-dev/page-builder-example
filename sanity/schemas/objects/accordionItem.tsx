import { MdViewDay } from 'react-icons/md'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'accordionItem',
  title: 'Accordion Item',
  type: 'object',
  icon: MdViewDay,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
      type: 'string',
    }),

    defineField({
      name: 'body',
      type: 'reducedBody',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'body',
    },
  },
})
