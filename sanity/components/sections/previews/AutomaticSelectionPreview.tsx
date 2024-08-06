import { Box, Text } from '@sanity/ui'

import { PreviewProps } from 'sanity'

import type { Body, NewsSection, TestimonialSection } from '@/sanity.types'
import { BellIcon, CommentIcon } from '@sanity/icons'
import { ComponentType } from 'react'
import ContentArrayPreviewContainer from '../container/PreviewContainer'

type AutomaticSectionProps = PreviewProps & {
  _type: string
  body: Body | string
  news?: NewsSection['news']
  loadAll: NewsSection['loadAll']
  testimonials?: TestimonialSection['testimonials']
  loadTags?: TestimonialSection['loadTags']
}

const AutomaticSectionPreview: ComponentType<AutomaticSectionProps> = (
  props,
) => {
  const {
    _type,
    title,
    subtitle,
    body,
    news,
    testimonials,
    loadAll,
    loadTags,
  } = props

  const itemType = _type === 'newsSection' ? 'News' : 'Testimonials'
  const allItems =
    _type === 'newsSection'
      ? loadAll
      : loadTags?.some((tag) => tag === 'loadAll')

  const selectedItemsText = (type: string) => {
    // If type is news, return news itemsLength
    if (type === 'news') `${news?.length}`

    // If type is testimonials, return testimonials tags or itemsLength
    if (type === 'testimonials') {
      const tags = loadTags?.filter((tag) => tag !== 'loadAll')

      return (
        `Selected Tags: ${tags?.join(',')}` ||
        `${testimonials?.length} testimonials are selected`
      )
    }
  }

  return (
    <ContentArrayPreviewContainer
      type={`${itemType} Section`}
      title={props.title as string}
      body={body}
      icon={_type === 'newsSection' ? <BellIcon /> : <CommentIcon />}
    >
      {allItems && (
        <Box>
          <Text size={1} muted style={{ fontStyle: 'italic' }}>
            {`All ${itemType} items will be loaded automatically`}
          </Text>
        </Box>
      )}
      {!allItems && (
        <Box>
          <Text size={1} muted style={{ fontStyle: 'italic' }}>
            {selectedItemsText(_type)}
          </Text>
        </Box>
      )}
    </ContentArrayPreviewContainer>
  )
}

export default AutomaticSectionPreview
