import { CommentIcon } from '@sanity/icons'
import { Box, Flex, Text } from '@sanity/ui'
import { ComponentType } from 'react'
import { PreviewProps } from 'sanity'

const TestimonialPreview: ComponentType<PreviewProps> = (props) => {
  const { title, subtitle, renderDefault } = props

  return (
    <>
      <Box>
        {/*  */}
        {renderDefault({
          ...props,
          title: 'Testimonial',
          subtitle: 'Reference',
          media: <CommentIcon />,
        })}
      </Box>
      <Box paddingX={5} paddingBottom={4} paddingTop={4}>
        <Box padding={2}>
          {subtitle && (
            <Text size={1}>{(subtitle as string) || 'noTarget'}</Text>
          )}
        </Box>
        <Flex padding={2} justify="flex-end">
          {title && (
            <Text muted size={1}>
              {(title as string) || 'noTarget'}
            </Text>
          )}
        </Flex>
      </Box>
    </>
  )
}

export default TestimonialPreview
