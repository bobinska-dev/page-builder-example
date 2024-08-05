import InMenuInput from '@/sanity/components/isInMenu'
import { defineField } from 'sanity'

/** ## Page Settings fields
 *
 * - Page Placement settings -> Displays if page is part of the main navigation
 * - firstPublishedAt -> Automatically set when the page is first published
 *
 */
export const pageSettingsFields = [
  // * * * * Page Placement Settings * * * *
  defineField({
    name: 'isInMenu',
    title: 'Is in Menu',
    type: 'boolean',
    group: 'settings',
    components: {
      input: InMenuInput,
    },
  }),

  // * * * * First Published At * * * *
  defineField({
    name: 'firstPublishedAt',
    title: 'First Published At',
    description:
      'This field is automatically set when the page is first published.',
    type: 'datetime',
    readOnly: true,
    group: 'settings',
  }),
]
