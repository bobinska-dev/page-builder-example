import { Box, Button, ButtonProps, Text, Tooltip } from '@sanity/ui'
import { ComponentType, ReactNode } from 'react'
import { isString } from 'sanity'

/** ## Tooltip Button Props
 *
 * This interface defines the props that the `TooltipButton` component receives
 * and extends the {@link ButtonProps} interface.
 *
 * @param ButtonProps - is the props that the Sanity UI `Button` component receives.
 * @param tooltipContent - is the text that should be displayed in the tooltip.
 *
 */
export interface TooltipButtonProps extends ButtonProps {
  /** ### Tooltip Content
   *
   * Can be `string` or JSX Element
   */
  tooltipContent: string | ReactNode
  onClick: () => void
}

const TooltipButton: ComponentType<TooltipButtonProps> = ({
  tooltipContent,
  ...buttonProps
}) => (
  <Tooltip
    content={
      isString(tooltipContent) ? (
        <Box padding={1}>
          <Text muted size={1}>
            {tooltipContent}
          </Text>
        </Box>
      ) : (
        tooltipContent
      )
    }
  >
    <Button {...buttonProps} />
  </Tooltip>
)
export default TooltipButton
