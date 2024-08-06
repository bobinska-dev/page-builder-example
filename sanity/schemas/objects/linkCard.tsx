import { BsCardHeading } from 'react-icons/bs'
import { defineField, defineType, ReferenceValue, Rule } from 'sanity'

export default defineType({
  name: 'linkCard',
  title: 'Link Card',
  type: 'object',
  icon: BsCardHeading,
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'icon',
    },
  },
  fields: [
    // * * * Title * * *
    defineField({
      name: 'title',
      type: 'overview',
      description:
        'This will be used the title of the link. Short and on point – max. 100',
      validation: (Rule) => [Rule.required().max(100)],
    }),

    // * * * Description * * *
    defineField({
      name: 'description',
      title: 'Link Description',
      type: 'overview',
      validation: (Rule: Rule) => Rule.required().max(100),
    }),

    // * * * url * * *
    defineField({
      name: 'url',
      title: 'Url',
      type: 'url',
      validation: (Rule) => [
        Rule.uri({
          allowRelative: false,
          scheme: ['https', 'mailto', 'tel'],
        }),
        Rule.custom((url, { parent }) => {
          if (
            url &&
            (parent as { internalLink: ReferenceValue }).internalLink
          ) {
            return 'You can only have one link, please remove one  (url or internal)'
          }
          if (
            !url &&
            !(parent as { internalLink: ReferenceValue }).internalLink
          ) {
            return 'One link (url or internal) is required'
          }
          return true
        }),
      ],
    }),

    // * * * internal link * * *
    defineField({
      name: 'internalLink',
      title: 'Internal Link',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'news' }],
      validation: (Rule) => [
        Rule.custom((internalLink, { parent }) => {
          // * Only one link is allowed
          if (internalLink && (parent as { url: string }).url) {
            return 'You can only have one link, please remove one  (url or internal)'
          }
          // * At least one link is required
          if (!internalLink && !(parent as { url: string }).url) {
            return 'One link (url or internal) is required'
          }
          return true
        }),
      ],
    }),
  ],
})
