import { Header } from '@/components/shared/Header'
import { PagePayload } from '@/types'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { content, description, title } = data ?? {}

  return (
    <div>
      <div className="mb-14">
        {/* Header */}
        <Header title={title} description={description} />

        {/* Content */}
      </div>
      <div className="absolute left-0 w-screen border-t" />
    </div>
  )
}

export default Page
