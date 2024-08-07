import { ImageHeaderSection } from '@/sanity.types'
import { urlForImage } from '@/sanity/lib/utils'
import { ImageIcon } from '@sanity/icons'
import { Box, Card, Stack, Text } from '@sanity/ui'
import { ComponentType } from 'react'
import { Image as ImageType, PreviewProps } from 'sanity'
import ContentArrayPreviewContainer from '../container/PreviewContainer'

type ImageHeaderSectionPreviewProps = PreviewProps & ImageHeaderSection

const ImageHeaderSectionPreview: ComponentType<
  ImageHeaderSectionPreviewProps
> = (props) => {
  const width = 400
  const height = 200
  const image = props.image as ImageType
  const imageUrl = image
    ? urlForImage(image)?.width(width).height(height).fit('fill').url()
    : ''

  return (
    <ContentArrayPreviewContainer
      type="Image Header Section"
      title="" //{props.title as string}
      body="" //{props.subtitle as string}
      icon={<ImageIcon />}
    >
      <Card
        style={{
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
          background: `url("${
            imageUrl ||
            `https://cdn.sanity.io/images/zvy7mysv/production/d06087e3a2bb8c0760cdefdfa1be504a360c3f34-1253x681.webp?w=${width}&h=${height}&fit=max`
          }") rgba(19, 20, 27, 0.971)`,
        }}
        radius={2}
        shadow={1}
      >
        <Stack
          space={4}
          style={{
            height: '100%',
            width: '100%',
          }}
          paddingX={4}
          paddingY={5}
        >
          <Box>
            <Text weight="bold" size={3}>
              {props.title as string}
            </Text>
          </Box>
          <Box>
            <Text weight="semibold" size={1}>
              {props.subtitle as string}
            </Text>
          </Box>
        </Stack>
      </Card>
      {/*       <Box>
        <Image
          src={
            imageUrl ||
            `https://cdn.sanity.io/images/zvy7mysv/production/d06087e3a2bb8c0760cdefdfa1be504a360c3f34-1253x681.webp?w=${width}&h=${height}&fit=max`
          }
          alt={props.title as string}
          width={width}
          height={height}
        />
      </Box> */}
    </ContentArrayPreviewContainer>
  )
}

export default ImageHeaderSectionPreview
