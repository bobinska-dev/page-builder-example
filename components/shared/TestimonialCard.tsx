import { TestimonialPayload } from '@/types'
import { ComponentType } from 'react'
import { CustomPortableText } from './CustomPortableText'

const TestimonialCard: ComponentType<TestimonialPayload> = ({
  title,
  _id,
  body,
}) => {
  return (
    <div
      id={'testimonial' + _id}
      className="max-w-[600px] mx-auto my-6 space-y-2 border shadow px-4 pb-3 pt-5"
    >
      <div className="text-lg text-gray-600">
        <CustomPortableText value={body} />
      </div>
      <div className="flex justify-end font-sans text-sm text-gray-400 italic">
        <p>{title}</p>
      </div>
    </div>
  )
}
export default TestimonialCard
