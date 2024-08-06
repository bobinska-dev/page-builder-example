import { AccordionSection, Body } from '@/sanity.types'
import { BlockElementIcon } from '@sanity/icons'
import { Card, Stack, Text } from '@sanity/ui'
import { ComponentType } from 'react'
import { PreviewProps } from 'sanity'
import ContentArrayPreviewContainer from '../container/PreviewContainer'

type AccordionPreviewProps = PreviewProps & AccordionSection

const AccordionPreview: ComponentType<AccordionPreviewProps> = (props) => {
  return (
    <ContentArrayPreviewContainer
      type="Accordion Section"
      title={props.title as string}
      body={props.body as Body}
      icon={<BlockElementIcon />}
    >
      <Stack space={1}>
        {props?.accordion?.map((item) => (
          <Card key={item._key} padding={3} radius={2} shadow={1}>
            <Text size={0} muted>
              {item.title}
            </Text>
          </Card>
        ))}
      </Stack>
    </ContentArrayPreviewContainer>
  )
}

export default AccordionPreview
