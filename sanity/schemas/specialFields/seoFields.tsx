import SlugInput from '@/sanity/components/inputs/SlugInput'
import { defineField } from 'sanity'

/** ## SEO fields
 *
 * - slug based on title and isUnique
 * - description (`_type: overview`)
 * - OG image
 *
 */
export const seoFields = [
  // * * * * SLUG * * * *
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {
      source: 'title',
      maxLength: 96,
      isUnique: (value, context) => context.defaultIsUnique(value, context),
    },
    components: {
      input: SlugInput,
    },
    validation: (rule) => rule.required(),
  }),

  // * * * * Description * * * *
  defineField({
    name: 'description',
    title: 'Overview',
    type: 'overview',
    group: 'seo',
  }),
  // * * * * OG Image * * * *

  defineField({
    name: 'image',
    title: 'OG Image',
    type: 'aiImage',
    group: 'seo',
    validation: (Rule) => Rule.required().assetRequired(),
  }),
]
