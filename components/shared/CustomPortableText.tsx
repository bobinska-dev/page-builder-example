import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'
import type { Image } from 'sanity'

import ImageBox from '@/components/shared/ImageBox'
import { Overview, ReducedBody } from '@/sanity.types'
import { resolveHref } from '@/sanity/lib/utils'
import { BodyPayload, PTEButtonType } from '@/types'
import Link from 'next/link'

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[] | Overview | ReducedBody | BodyPayload
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>
      },
      h2: ({ children }) => {
        return (
          <h2 className="my-5 text-xl font-bold tracking-tight md:text-3xl mb-">
            {children}
          </h2>
        )
      },
      h3: ({ children }) => {
        return (
          <h3 className="my-4 text-lg font-bold tracking-tight md:text-2xl">
            {children}
          </h3>
        )
      },
      h4: ({ children }) => {
        return (
          <h4 className="my-3 text-md font-bold tracking-tight md:text-xl">
            {children}
          </h4>
        )
      },
      h5: ({ children }) => {
        return (
          <h5 className="my-3 text-md font-semibold tracking-tight md:text-lg">
            {children}
          </h5>
        )
      },
      h6: ({ children }) => {
        return (
          <h6 className="my-3 text-md font-semibold tracking-tight md:text-lg">
            {children}
          </h6>
        )
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
    },
    types: {
      imageBlock: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        )
      },
      buttons: ({ value }) => {
        const buttonClass = `inline-block px-4 py-2 rounded-md hover:shadow-[0_2px_10px] hover:shadow-green-600/30 font-semibold bg-gradient-to-r from-green-600 to-cyan-600 text-white`
        return (
          <div className="flex flex-wrap gap-x-3 gap-y-4 justify-center items-center my-3">
            {value?.buttons.map((pteButton: PTEButtonType) =>
              pteButton.type === 'external' ? (
                <Link
                  key={pteButton._key}
                  className={buttonClass}
                  href={pteButton.href || ''}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {pteButton.title}
                </Link>
              ) : pteButton.type === 'functional' ? (
                <button key={pteButton._key} className={buttonClass}>
                  {pteButton.title}
                </button>
              ) : pteButton.type === 'internal' ? (
                <Link
                  href={resolveHref(pteButton.docType, pteButton.slug) ?? ''}
                  key={pteButton._key}
                  className={buttonClass}
                >
                  {pteButton.title}
                </Link>
              ) : (
                <button key={pteButton._key} className={buttonClass}>
                  {pteButton.title}
                </button>
              ),
            )}
          </div>
        )
      },
      testimonial: ({ value }) => {
        return (
          <div className={`my-6 space-y-2 border shadow px-4 pb-3 pt-5`}>
            <div className="font-serif text-lg text-gray-600">
              <CustomPortableText value={value.body} />
            </div>
            <div className="flex justify-end font-sans text-sm text-gray-400">
              {value.title}
            </div>
          </div>
        )
      },
    },
  }

  return (
    <PortableText
      components={components}
      value={value as PortableTextBlock[]}
      onMissingComponent={(props) =>
        console.log('MISSING PTE component', props)
      }
    />
  )
}
