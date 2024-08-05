import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import {
  filterForUsedPagesAndNews,
  filterForUsedPagesHomePage,
} from '../../lib/filterOptions'

export default defineType({
  name: 'siteSettings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'menuDef',
      title: 'Menu',
    },
    {
      name: 'footer',
      title: 'Further Links in Footer',
    },
    {
      name: 'social',
      title: 'Socials & Contact',
    },
    {
      name: 'donation',
      title: 'Donation Popup',
    },
    {
      name: 'errorpage',
      title: 'Page Images',
    },
    {
      name: 'logos',
      title: 'Logos',
    },
  ],

  fields: [
    // * * * * Title * * * *
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      hidden: true,
    }),

    // * * * * homePage * * * *
    defineField({
      name: 'homePage',
      title: 'Home Page',
      description: 'Select the page to be displayed as the home page',
      type: 'reference',
      to: [{ type: 'page' }],
      options: {
        filter: ({ document }) => filterForUsedPagesHomePage(document),
      },
      group: 'menuDef',
      validation: (Rule) => Rule.required(),
    }),
    // * * * * Menu * * * *
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'menu',
      group: 'menuDef',
      description:
        'The menu that is used in the navigation. The first menu item will appear first in the navigation. You can add menu items with or without nested submenus.',
    }),

    // * * * * Footer Quick Links * * * *
    defineField({
      name: 'quickLinks',
      title: 'QuickLinks in the Footer',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }, { type: 'news' }],
          description:
            'Select a page to add it to the footer quick links. Pages used in the menu are excluded.',
          options: {
            filter: ({ document }) => filterForUsedPagesAndNews(document),
          },
        },
      ],
    }),

    //* * * * Fallback OG image * * * *
    defineField({
      name: 'ogImage',
      title: 'Fallback Open Graph Image',
      type: 'aiImage',
      description: 'Displayed on social cards and search engine results.',
      group: 'errorpage',
    }),
    // * * * * Error Pages * * * *
    defineField({
      name: 'pageNotFound',
      title: '404 - Page not found',
      type: 'aiImage',
      group: 'errorpage',
    }),
    defineField({
      name: 'serverError',
      title: '500 - Woops something went wrong',
      type: 'aiImage',
      group: 'errorpage',
    }),
    // * * * * Logos * * * *
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'object',
      group: 'logos',
      fields: [
        defineField({
          name: 'logoColor',
          title: 'Logo',
          type: 'aiImage',
          validation: (Rule) => Rule.required().assetRequired(),
        }),
        defineField({
          name: 'logoWhite',
          title: 'White Logo',
          type: 'aiImage',
        }),
        defineField({
          name: 'logoBlack',
          title: 'Black Logo',
          type: 'aiImage',
        }),
      ],
    }),
  ],
})
