import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'image',
  title: 'Image',
  type: 'image',
  description: `Please add the metadata you want to use in the frontend.`,
  icon: ImageIcon,
  options: {
    hotspot: true,
    metadata: ['blurhash', 'lqip', 'palette'],
    aiAssist: {
      imageDescriptionField: 'altText',
      imageInstructionField: 'promptForImage',
    },
  },
  fieldsets: [
    {
      name: 'aiFields',
      title: 'AI Fields',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    // * alt text for image
    defineField({
      type: 'text',
      name: 'altText',
      title: 'Alt Text',
      description:
        'This field will be generated automatically by AI, if you change the image. It can also be synced to the image asset itself so it can be reused -> use the button below, if there is a difference.',
      rows: 2,
      validation: (Rule) => Rule.required(),
      components: {
        // TODO: add component to sync image alt to asset document
        // field: ResolveImageAltField,
      },
    }),

    // * prompt input for AI image generation
    defineField({
      name: 'promptForImage',
      type: 'text',
      title: 'Prompt for Image',
      description:
        'Please describe the image content so that Dal-e can generate an image for you.',
      rows: 1,
      fieldset: 'aiFields',
    }),
  ],
})
