import ImageHeaderSectionPreview from '@/sanity/components/sections/previews/ImageHeaderSectionPreview'
import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'imageHeaderSection',
  title: 'Image-Header ',
  type: 'object',
  icon: ImageIcon,
  components: {
    preview: ImageHeaderSectionPreview,
  },
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'icon',
      image: 'image',
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

    // * * * Subtitle * * *
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'overview',
      description:
        'This will be used as the H2 of the Sections. Short and on point – max. 200',
      options: { initialActive: true },
      validation: (Rule) => Rule.max(200),
    }),

    // * * * Image * * *
    defineField({
      name: 'image',
      title: 'Image',
      type: 'aiImage',
      validation: (Rule) => Rule.required().assetRequired(),
    }),
  ],
})
