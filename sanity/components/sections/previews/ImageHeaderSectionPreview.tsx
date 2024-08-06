import { ImageHeaderSection } from '@/sanity.types'
import { urlForImage } from '@/sanity/lib/utils'
import { ImageIcon } from '@sanity/icons'
import { Card } from '@sanity/ui'
import Image from 'next/image'
import { ComponentType } from 'react'
import { Image as ImageType, PreviewProps } from 'sanity'
import ContentArrayPreviewContainer from '../container/PreviewContainer'

type ImageHeaderSectionPreviewProps = PreviewProps & ImageHeaderSection

const ImageHeaderSectionPreview: ComponentType<
  ImageHeaderSectionPreviewProps
> = (props) => {
  const width = 300
  const height = 100
  const image = props.image as ImageType
  const imageUrl = image
    ? urlForImage(image)?.width(width).height(height).url()
    : ''

  return (
    <ContentArrayPreviewContainer
      type="Image Header Section"
      title={props.title as string}
      body={props.subtitle as string}
      icon={<ImageIcon />}
    >
      <Card>
        <Image
          src={
            imageUrl ||
            `https://cdn.sanity.io/images/zvy7mysv/production/d06087e3a2bb8c0760cdefdfa1be504a360c3f34-1253x681.webp?w=${width}&h=${height}&fit=max`
          }
          alt={props.title as string}
          width={width}
          height={height}
        />
      </Card>
    </ContentArrayPreviewContainer>
  )
}

export default ImageHeaderSectionPreview
