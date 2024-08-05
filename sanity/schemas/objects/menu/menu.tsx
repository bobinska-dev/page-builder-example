import { VscGitMerge, VscLocation } from 'react-icons/vsc'
import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Menu items for page navigation
 *
 */
export default defineType({
  name: 'menu',
  title: 'Menu',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'object',
      name: 'menuItem',
      title: 'Menu Item',
      fields: [
        // * * * * Title * * * *
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),

        // * * * * isNested * * * *
        defineField({
          name: 'isNested',
          title: 'Is Nested',
          description:
            'Does this menu item have a submenu, which means additional links will be probably shown in a dropdown menu?',
          type: 'boolean',
          initialValue: false,
        }),

        // * * * * Link * * * *
        defineField({
          name: 'link',
          title: 'Link',
          type: 'reference',
          validation: (Rule) =>
            Rule.custom((link, context) => {
              // if isNested is not true, link is required
              // @ts-ignore
              if (!context.parent?.isNested && !link) {
                return 'A link is required'
              }
              return true
            }),
          hidden: ({ parent }) => parent?.isNested,
          to: [
            // { type: 'news' },
            { type: 'page' },
          ],
        }),

        // * * * * Submenu -> no nesting * * * *
        defineField({
          name: 'menuItems',
          title: 'MenuItems',
          type: 'array',
          hidden: ({ parent }) => !parent?.isNested,
          validation: (Rule) =>
            Rule.custom((menuItems, context) => {
              // if isNested is true, menuItems are required
              if (
                // @ts-ignore
                context.parent?.isNested &&
                (!menuItems || menuItems.length === 0)
              ) {
                return 'At least one submenu item is required'
              }
              return true
            }),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'menuItem',
              title: 'Menu Item',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'link',
                  title: 'Link',
                  type: 'reference',
                  validation: (Rule) => Rule.required(),
                  to: [
                    // { type: 'news' },
                    { type: 'page' },
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
      preview: {
        select: {
          title: 'title',
          isNested: 'isNested',
          link: 'link',
          submenu: 'menuItems',
        },
        prepare({ title, isNested, link, submenu }) {
          return {
            title: title,
            subtitle: isNested ? 'Nested menu' : link?.title,
            media: isNested ? <VscGitMerge /> : <VscLocation />,
          }
        },
      },
    }),
  ],
})
