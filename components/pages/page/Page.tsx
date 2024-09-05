import { PagePayload } from '@/types'
import { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { renderContent } from './renderContent'

export interface PageProps {
  data: PagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function Page({ data, encodeDataAttribute }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { content, description, title } = data ?? {}

  return (
    <div className="space-y-20">
      {/* Content */}
      <div>{renderContent(data?.content || [])}</div>
    </div>
  )
}

export default Page
