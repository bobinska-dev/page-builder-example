import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

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
  ],

  fields: [
    // * * * * Title * * * *
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      // hidden: true,
    }),

    // * * * * homePage * * * *
    defineField({
      name: 'homePage',
      title: 'Home Page',
      description: 'Select the page to be displayed as the home page',
      type: 'reference',
      to: [{ type: 'page' }],
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
          to: [{ type: 'page' }],
        },
      ],
    }),
    // * * * * Error Pages * * * *
    defineField({
      name: 'pageNotFound',
      title: '404 - Page not found',
      type: 'image',
      group: 'errorpage',
    }),
    defineField({
      name: 'serverError',
      title: '500 - Woops something went wrong',
      type: 'image',
      group: 'errorpage',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'object',
      group: 'errorpage',
      fields: [
        defineField({
          name: 'logoColor',
          title: 'Logo',
          type: 'image',
          validation: (Rule) => Rule.required().assetRequired(),
        }),
        defineField({
          name: 'logoWhite',
          title: 'White Logo',
          type: 'image',
        }),
        defineField({
          name: 'logoBlack',
          title: 'Black Logo',
          type: 'image',
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Fallback Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      group: 'errorpage',
    }),
  ],
})
