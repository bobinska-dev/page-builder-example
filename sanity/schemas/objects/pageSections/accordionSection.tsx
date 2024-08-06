import AccordionPreview from '@/sanity/components/sections/previews/AccordionSectionPreview'
import { BlockElementIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'accordionSection',
  title: 'Accordion Section',
  type: 'object',
  icon: BlockElementIcon,
  components: {
    preview: AccordionPreview,
    // item: AccordionSectionItem,
  },
  preview: {
    select: {
      title: 'title',
      accordion: 'accordion',
      body: 'body',
      media: 'icon',
    },
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
    }),

    // * * * Accordion * * *
    defineField({
      name: 'accordion',
      title: 'Accordion',
      type: 'array',
      of: [{ type: 'accordionItem' }],
      validation: (Rule) => Rule.required().min(2),
    }),
  ],
})
