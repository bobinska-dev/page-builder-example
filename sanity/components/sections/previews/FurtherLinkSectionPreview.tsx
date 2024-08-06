import { Body, FurtherLinkSection, LinkCard } from '@/sanity.types'
import { apiVersion } from '@/sanity/lib/api'
import { capitaliseFirstLetter } from '@/sanity/lib/utils/capitaliseFirstLetter'
import { TagsIcon } from '@sanity/icons'
import { Box, Card, Flex, Text, Tooltip } from '@sanity/ui'
import { toPlainText } from 'next-sanity'
import { ComponentType, useEffect, useState } from 'react'
import { PreviewProps, useClient } from 'sanity'
import ContentArrayPreviewContainer from '../container/PreviewContainer'

type FurtherLinkSectionPreviewProps = PreviewProps & FurtherLinkSection

const FurtherLinkSectionPreview: ComponentType<
  FurtherLinkSectionPreviewProps
> = (props) => {
  // client
  const client = useClient({ apiVersion }).withConfig({
    perspective: 'previewDrafts',
  })
  // * State for internal links
  const [internalLinks, setInternalLinks] = useState<
    { title: string; _id: string; _type: string }[]
  >([])

  // * Fetch all internal links
  useEffect(() => {
    if (props?.links) {
      // get all internal links with type
      props?.links?.some((link) => link.internalLink?._ref) &&
        client
          .fetch(
            `*[_id in $ids]{ title, _id, _type }`,
            {
              ids: props?.links
                ?.filter((link) => link.internalLink)
                .map((link) => link.internalLink?._ref),
            },
            { tag: 'internalLinks' },
          )
          .then((docs) => {
            setInternalLinks(docs)
          })
          .catch((err) => console.error(err))
    }
  }, [])

  /** `toolTipText` generates the popover text for each button and displays the target  */
  const tooltipText = (linkCard: LinkCard) => {
    const internalLink = internalLinks.find(
      (link) => link._id === linkCard.internalLink?._ref,
    )
    const linkType = internalLink?._type
      ? capitaliseFirstLetter(internalLink._type)
      : 'No type'
    const linkTitle = internalLink?.title || 'No title'
    // if linkCard has an internalLink._ref property return the title of the internal link, if linkCard has url property, return the url value, fallback to 'No link'
    return linkCard.internalLink?._ref
      ? `${linkType}: ${linkTitle}` || 'No link'
      : linkCard.url || 'No link'
  }
  return (
    <ContentArrayPreviewContainer
      type="Further Link Section"
      title={props.title as string}
      body={props.body as Body}
      icon={<TagsIcon />}
    >
      <Flex gap={2}>
        {props?.links?.map((linkCard) => (
          <Tooltip
            key={linkCard._key}
            content={
              <Box padding={2}>
                <Text align="center" size={0} muted>
                  {tooltipText(linkCard)}
                </Text>
              </Box>
            }
            fallbackPlacements={['right', 'left']}
            placement="top"
            portal
          >
            <Card padding={3} radius={2} shadow={1}>
              <Text size={0} muted>
                {linkCard.title ? toPlainText(linkCard.title) : 'No title'}
              </Text>
            </Card>
          </Tooltip>
        ))}
      </Flex>
    </ContentArrayPreviewContainer>
  )
}

export default FurtherLinkSectionPreview
