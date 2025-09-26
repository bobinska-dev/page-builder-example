import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { toPlainText } from 'next-sanity'
import { ComponentType } from 'react'
import { IconType } from 'react-icons/lib'
import { PortableTextBlock, isArray } from 'sanity'
import styled from 'styled-components'
import MediaIcon from './IconContainer'

type ArrayItemContainerProps = {
  body: Body | any[] |string | PortableTextBlock[]
  icon: IconType | any
  children?: any
  type: string
  title: string
}

/** ### Container for Page Builder Sections Previews
 *
 * This component is a container for the preview of page builder sections.
 *
 * @param {string} type - The type title of the section
 * @param {string} title - The title of the section
 * @param {string | PortableTextBlock[]} body - The body of the section
 * @param {IconType} icon - The icon of the section
 * @param {any} children - The children of the section
 *
 * @returns {JSX.Element} - The preview container
 *
 * @example
 *
 * ```tsx
 * <ContentArrayPreviewContainer
 *  type="Accordion Section"
 *  title={props.title as string}
 *  body={props.body}
 *  icon={<BsViewList />}
 * >
 * // ...specific content components for each section
 * </ContentArrayPreviewContainer>
 * ```
 *
 *
 */
const ContentArrayPreviewContainer: ComponentType<ArrayItemContainerProps> = ({
  children,
  type,
  body,
  icon,
  title,
}) => {
  const bodyText =
    isArray(body) === true
      ? toPlainText(body as PortableTextBlock[]).substring(0, 180) + ' (...)'
      : (body as string)?.substring(0, 180) + ' (...)'
  return (
    <CardFullWidth paddingY={2} paddingX={2} radius={2}>
      <FlexFullWidth
        justify="space-between"
        gap={3}
        align={'center'}
        paddingY={2}
      >
        {
          // * * * Icon * * *
          icon && MediaIcon(icon)
        }
        <Stack space={2} style={{ width: '100%' }}>
          {/* TYPE Banner */}
          {type && (
            <Card tone="primary" padding={1}>
              <Text size={0} muted align={'left'}>
                {type}
              </Text>
            </Card>
          )}
          {/* Title */}
          {title && <h2>{title as string}</h2>}
          {/* Body String */}
          {body && (
            <Box paddingY={2}>
              <Text size={1} muted>
                {bodyText}
              </Text>
            </Box>
          )}
          {/* Children */}
          <Box paddingTop={2}>{children}</Box>
        </Stack>
      </FlexFullWidth>
    </CardFullWidth>
  )
}
const CardFullWidth = styled(Card)`
  width: 100%;
  &:hover {
      //@ts-ignore
    background: var(--card-bg-hover);
  }
`
const FlexFullWidth = styled(Flex)`
  width: 100%;
`

export default ContentArrayPreviewContainer
