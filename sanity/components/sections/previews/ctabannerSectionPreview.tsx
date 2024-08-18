import { Button, CtaBannerSection } from '@/sanity.types'
import { apiVersion } from '@/sanity/lib/api'
import { capitaliseFirstLetter } from '@/sanity/lib/utils/capitaliseFirstLetter'
import { InfoOutlineIcon } from '@sanity/icons'
import { Box, Card, Flex, Text, Tooltip } from '@sanity/ui'
import { ComponentType, useEffect, useState } from 'react'
import { PreviewProps, useClient } from 'sanity'
import ContentArrayPreviewContainer from '../container/PreviewContainer'

type CtaPreviewProps = PreviewProps & CtaBannerSection

const CtaSectionPreview: ComponentType<CtaPreviewProps> = (props) => {
  const { title, body, media } = props

  // client
  const client = useClient({ apiVersion }).withConfig({
    perspective: 'previewDrafts',
  })

  // * Internal Link State
  const [internalLinks, setInternalLinks] = useState<
    Array<{ title: string; _id: string; _type: string }>
  >([])

  // * Internal Link State
  const [fileButtons, setFileButtons] = useState<
    Array<{ title: string; _id: string }>
  >([])

  // * All buttons
  const allButtons = body
    ?.filter((item) => item._type === 'buttons')
    //@ts-ignore
    .map((block) => block.buttons)
    .flat()

  // * Fetch all internal links and file buttons titles
  useEffect(() => {
    if (allButtons) {
      // get all internal links with type
      allButtons?.some((button) => button?.linkInternal?._ref) &&
        client
          .fetch(
            `*[_id in $ids]{ title, _id, _type }`,
            {
              ids: allButtons
                ?.filter((button) => button?.type === 'internal')
                .map((button) => button?.linkInternal?._ref),
            },
            { tag: 'internalLinkButtons' },
          )
          .then((docs) => {
            setInternalLinks(docs)
          })
          .catch((err) => console.error(err))

      // get all file buttons
      allButtons?.some((button) => button?.file?.asset?._ref) &&
        client
          .fetch(
            `*[_id in $ids]{ title, _id }`,
            {
              ids: allButtons
                ?.filter((button) => button?.type === 'file')
                .map((button) => button?.file?.asset?._ref),
            },
            { tag: 'fileButtons' },
          )
          .then((docs) => {
            setFileButtons(docs)
          })
          .catch((err) => console.error(err))
    }
  }, [])

  /** `toolTipText` generates the popover text for each button and displays the target  */
  const tooltipText = (button: Button) => {
    switch (button.type) {
      case 'internal':
        const link = internalLinks.find(
          (link) => link._id === button.linkInternal?._ref,
        )
        return (
          `${capitaliseFirstLetter(link?._type!)}: ${link?.title}` || 'No link'
        )
      case 'file':
        const file = fileButtons.find(
          (file) => file._id === button.file?.asset?._ref,
        )
        return `File: ${file?.title}` || 'No file'
      case 'external':
        return button.linkExternal || 'No link'
      case 'functional':
        return (
          `Opens: ${capitaliseFirstLetter(button.functional!)}` || 'No function'
        )
      default:
        return 'No link'
    }
  }

  return (
    <ContentArrayPreviewContainer
      type="CTA Banner Section"
      title={title as string}
      body={body}
      icon={<InfoOutlineIcon />}
    >
      <Flex gap={2}>
        {allButtons.length !== 0 &&
          allButtons.map((button) => (
            <Card key={button?._key} padding={3} radius={2} shadow={1}>
              <Tooltip
                content={
                  <Box padding={2}>
                    <Text align="center" size={0} muted>
                      {tooltipText(button!)}
                    </Text>
                  </Box>
                }
                fallbackPlacements={['right', 'left']}
                placement="top"
                portal
              >
                <Text align="center" size={0} muted>
                  {button?.title}
                </Text>
              </Tooltip>
            </Card>
          ))}
      </Flex>
    </ContentArrayPreviewContainer>
  )
}

export default CtaSectionPreview
