import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

import { PagePayload } from '@/types'
import { renderContent } from '../page/renderContent'

export interface HomePageProps {
  data: PagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { description = [], title = '' } = data ?? {}
  // console.log(data)
  return (
    <div className="space-y-20">
      {/* Content */}
      <div>{renderContent(data?.content || [])}</div>
    </div>
  )
}

export default HomePage
