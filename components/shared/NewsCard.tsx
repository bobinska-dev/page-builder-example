import Link from 'next/link'

import { resolveHref, urlForImage } from '@/sanity/lib/utils'
import { NewsPayload } from '@/types'
import Image from 'next/image'
import { ComponentType } from 'react'
const NewsCard: ComponentType<NewsPayload> = ({
  title,
  subtitle,
  _type,
  image,
  slug,
}) => {
  const imageUrl = image && urlForImage(image)?.width(400).height(300).url()

  return (
    <Link href={resolveHref(_type, slug) ?? ''}>
      <div className="shadow-medium rounded-lg max-w-[300px] h-full items-stretch flex flex-col justify-start cursor-pointer max-h-[70vh] md:max-h-[60vh] text-ellipsis pb-3">
        {image && (
          <div className="w-full">
            <Image
              src={imageUrl ?? ''}
              alt={image.altText || `Image ${title}`}
              sizes="(max-width: 300px) 100vw, 300px"
              className="rounded-l"
              style={{
                objectFit: 'cover',
              }}
              width={300}
              height={300}
              priority={false}
              loading="lazy"
              blurDataURL={image.blurHashURL}
            />
          </div>
        )}
        {title && (
          <h4 className="pt-4 px-3 text-ellipsis text-lg font-bold">{title}</h4>
        )}
        {subtitle && (
          <p className="pt-2 px-3 text-gray-600 text-sm">{subtitle}</p>
        )}
      </div>
    </Link>
  )
}

export default NewsCard
