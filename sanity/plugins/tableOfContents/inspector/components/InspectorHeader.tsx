import { CloseIcon } from '@sanity/icons'
import { Box, Card, Flex, Text, type CardProps } from '@sanity/ui'
import { type HTMLProps, type ReactNode } from 'react'
import { useTranslation } from 'sanity'
import { styled } from 'styled-components'

import TooltipButton from '@/sanity/components/TooltipButton'

export interface DocumentInspectorHeaderProps {
  as?: CardProps['as']
  closeButtonLabel: string
  flex?: CardProps['flex']
  onClose: () => void
  title: ReactNode
}

const Root = styled(Card)({
  position: 'relative',
  zIndex: 1,
  lineHeight: 0,
})

/** @internal */
export function InspectorHeader(
  props: DocumentInspectorHeaderProps &
    Omit<HTMLProps<HTMLDivElement>, 'as' | 'height' | 'ref'>,
) {
  const {
    as: forwardedAs,
    children,
    closeButtonLabel,
    onClose,
    title,
    ...restProps
  } = props
  const { t } = useTranslation('table-of-contents')

  return (
    <Root {...restProps} as={forwardedAs}>
      <Flex padding={2}>
        <Box flex={1} padding={3}>
          <Text as="h1" size={1} weight="medium">
            {title}
          </Text>
        </Box>
        <Box flex="none" padding={1}>
          <TooltipButton
            aria-label={closeButtonLabel}
            icon={CloseIcon}
            mode="bleed"
            onClick={onClose}
            tooltipContent={t(
              'table-of-contents-inspector.close-button.tooltip',
            )}
          />
        </Box>
      </Flex>
      {children}
    </Root>
  )
}
