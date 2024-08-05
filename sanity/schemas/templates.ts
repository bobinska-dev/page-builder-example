import { TemplateResolver } from 'sanity'

export const templates: TemplateResolver = (prev) => [
  ...prev /* pageDuplicationTemplate */,
]
