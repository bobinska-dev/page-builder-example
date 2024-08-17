import { toPlainText } from 'next-sanity'
import { PortableTextBlock } from 'sanity'

export const getTitle = (title: string | PortableTextBlock[]) => {
  return typeof title === 'object' ? toPlainText(title) : title
}
