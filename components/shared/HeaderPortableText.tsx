import { Overview, ReducedBody } from '@/sanity.types'
import { BodyPayload } from '@/types'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'
import { ComponentType } from 'react'

export function HeaderPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[] | Overview | ReducedBody | BodyPayload
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return (
          <h2
            className={
              paragraphClasses +
              ' my-5 text-xl font-bold tracking-tight md:text-3xl'
            }
          >
            {children}
          </h2>
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
  }

  return (
    <PortableText
      components={components}
      value={value as PortableTextBlock[]}
    />
  )
}

export const HeaderXPortableText: ComponentType<{
  paragraphClasses?: string
  value: PortableTextBlock[] | Overview | ReducedBody | BodyPayload
  level: number
}> = ({ paragraphClasses, value, level }) => {
  // heading element based on the level, for example level 1 is h1, level 2 is h2, etc.
  const HeadingElement = `h${level}` as keyof JSX.IntrinsicElements
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return (
          <HeadingElement className={paragraphClasses + ' tracking-tight'}>
            {children}
          </HeadingElement>
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
  }

  return (
    <PortableText
      components={components}
      value={value as PortableTextBlock[]}
    />
  )
}
