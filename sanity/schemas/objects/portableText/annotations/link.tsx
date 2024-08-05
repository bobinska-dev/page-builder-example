import { defineField } from 'sanity'
import LinkAnnotationRenderer from './linkAnnotationRenderer'

/** ### Link Annotations
 *
 * This annotation allows you to add links to your text.
 *
 * Annotations are of the type `object`
 *
 * #### Fields are:
 * @field `type` (required) internal or external
 * @field `href` (required if type is external) url
 * @field `reference` (required if type is internal)
 *
 * You can add custom Annotations following our documentation https://www.sanity.io/docs/customizing-the-portable-text-editor#f924645007e1
 *
 */
export default defineField({
  name: 'link',
  title: 'Link',
  type: 'object',
  options: {
    modal: { type: 'dialog', width: 1 },
  },
  components: {
    annotation: LinkAnnotationRenderer,
  },
  validation: (Rule) =>
    Rule.custom((value) => {
      if (value?.type === 'internal') {
        return value.reference
          ? true
          : {
              message: 'Internal Link cannot be empty',
              path: 'reference',
            }
      }
      if (value?.type === 'external') {
        return value.href
          ? true
          : {
              message: 'URL field cannot be empty',
              path: 'href',
            }
      }
      return true
    }),
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      description:
        'Choose where this link will point to: a place inside the website or an external link.',
      options: {
        list: [
          { title: 'External', value: 'external' },
          { title: 'Internal', value: 'internal' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      type: 'url',
      title: 'Url',
      hidden: ({ parent }) => parent?.type === 'internal',
      validation: (rule) =>
        rule.uri({
          allowRelative: false,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'reference',
      type: 'reference',
      title: 'Internal Link',
      hidden: ({ parent }) => parent?.type === 'external',
      to: [{ type: 'page' }],
    }),
  ],
})
