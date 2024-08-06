import { Card, Stack, Text } from '@sanity/ui'
import { ComponentType } from 'react'
import { TableOfContentsProps } from './TableOfContentsInspector'

// TODO: Add a Table of Contents for the page builder
export const MultipleBodyTableOfContents: ComponentType<
  TableOfContentsProps
> = () => {
  return (
    <Stack space={4} paddingY={4} paddingX={3}>
      <Card paddingX={3}>
        <Text as={'h3'} size={2} muted>
          🚧 Under construction! 🚧
        </Text>
      </Card>
      <Card paddingX={3}>
        <Text as={'p'} size={1} muted>
          Table of contents for page builder coming soon!
        </Text>
      </Card>
    </Stack>
  )
}
