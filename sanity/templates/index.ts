import { TemplateResolver } from 'sanity'
import { pageDuplicationTemplate } from './pageDuplicationTemplate'

export const templates: TemplateResolver = (prev) => [
  ...prev,
  pageDuplicationTemplate,
]
