import { CommentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const testimonialTags = [
  { title: 'Customer', value: 'customer' },
  { title: 'Partner', value: 'partner' },
  { title: 'Investor', value: 'investor' },
]

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: CommentIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Source',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Testimonial',
      type: 'reducedBody',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: testimonialTags,
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'body',
    },
  },
})
