import { BellIcon } from '@sanity/icons'
import { Stack, Text, Tooltip } from '@sanity/ui'
import { ComponentType, useEffect, useState } from 'react'
import { BlockAnnotationProps, useClient } from 'sanity'
import styled from 'styled-components'

const NewsAnnotation: ComponentType<BlockAnnotationProps> = (props) => {
  const { value, renderDefault } = props
  // in order to be able to query for data in the studio, you need to setup a client version
  const client = useClient({
    apiVersion: '2022-10-31',
  })
  const [reference, setReference] = useState<any>({})

  // then get the data from the referenced document
  useEffect(() => {
    // so let's setup the query and params to fetch the values we need.
    const query = `*[_id == $ref]{title}[0]`
    const params = { ref: value?._ref || '' }

    const fetchReference = async () => {
      await client
        .fetch(query, params)
        .then((res) => {
          setReference(res)
        })
        .catch((err) => {
          console.error(err.message)
        })
    }
    value._ref && fetchReference()
  }, [value._ref])

  return (
    <>
      <Tooltip
        content={
          /* In this instance we stack our text instead of only using a Box with padding we can hen also define a space between items */
          <Stack space={2} padding={3}>
            <Text align="center" muted size={1}>
              {`Title: ${reference?.title}` || 'No title found'}
            </Text>
          </Stack>
        }
        fallbackPlacements={['right', 'left', 'top']}
        placement="bottom"
        portal
      >
        <InlineAnnotation>
          <Icon /> <>{renderDefault(props)}</>
          {/* 
        renderDefault() is needed to let the studio handle the functionality of the annotation, so we don't have to. */}
        </InlineAnnotation>
      </Tooltip>
    </>
  )
}
const InlineAnnotation = styled.span`
  padding-left: 0.3em;
  padding-right: 0.2em;
`
const Icon = styled(BellIcon)`
    // @ts-ignore
  color: ${(props) => props.theme.sanity.color.base.border};
  padding-right: 5px;
`
export default NewsAnnotation
