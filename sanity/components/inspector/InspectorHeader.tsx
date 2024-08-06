import { CloseIcon } from '@sanity/icons'
import { Card, Flex, Text } from '@sanity/ui'
import { forwardRef } from 'react'
import { styled } from 'styled-components'

import { Button } from '@sanity/ui'

const Root = styled(Card)({
  position: 'relative',
  zIndex: 1,
  lineHeight: 0,
})

interface InspectorHeaderProps {
  onClose: () => void
}

export const InspectorHeader = forwardRef(function InspectorHeader(
  props: InspectorHeaderProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { onClose } = props

  return (
    <Root ref={ref}>
      <Flex padding={2}>
        <Flex align="center" flex={1} gap={2} paddingY={2} padding={3}>
          <Text as="h1" size={1} weight="medium">
            Text Structure Inspector
          </Text>
        </Flex>

        <Flex flex="none" padding={1} gap={2}>
          <Button
            aria-label="close-pane-button-text-aria-label"
            icon={CloseIcon}
            mode="bleed"
            onClick={onClose}
          />
        </Flex>
      </Flex>
    </Root>
  )
})
