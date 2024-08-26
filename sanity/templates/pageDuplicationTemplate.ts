import { Template } from 'sanity'

export const pageDuplicationTemplate: Template = {
  title: 'Page duplication template',
  id: 'page-duplication-template',
  schemaType: 'page',
  parameters: [
    { title: 'Title', name: 'title', type: 'string' },
    { title: 'Slug', name: 'slug', type: 'slug' },
    { title: 'Overview', name: 'description', type: 'overview' },
    { title: 'Main image', name: 'image', type: 'image' },
    { title: 'Content', name: 'content', type: 'content' },
  ],
  value: (parameters: any) => ({
    title: 'Copy of: ' + parameters.title,
    slug: parameters.slug,
    description: parameters.description,
    image: parameters.image,
    content: parameters.content,
  }),
}
