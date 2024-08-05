import { BookIcon } from '@sanity/icons'
import { Stack, Text, Tooltip } from '@sanity/ui'
import { ComponentType, useEffect, useState } from 'react'
import { Subscription } from 'rxjs'
import { BlockAnnotationProps, useClient } from 'sanity'
import styled from 'styled-components'

const PublicationAnnotation: ComponentType<BlockAnnotationProps> = (props) => {
  const { value, renderDefault } = props
  // in order to be able to query for data in the studio, you need to setup a client version
  const client = useClient({
    apiVersion: '2022-10-31',
  })
  const [reference, setReference] = useState<any>({})

  // we need to initialise the subscription
  let subscription: Subscription
  // then get the data from the referenced document
  useEffect(() => {
    // so let's setup the query and params to fetch the values we need.
    const query = `*[_id == $ref]{title, description}[0]`
    const params = { ref: value?._ref }

    const fetchReference = async (listening = false) => {
      listening && (await sleep(1500)) // chances are the data isn't query-able yet
      await client
        .fetch(query, params)
        .then((res) => {
          setReference(res)
        })
        .catch((err) => {
          console.error(err.message)
        })
    }

    // since we store our referenced data in a state we need to make sure, we also listen to changes
    const listen = () => {
      subscription = client
        .listen(query, params, { visibility: 'query' })
        .subscribe(() => fetchReference(true))
    }

    value._ref && fetchReference().then(listen)

    // and then we need to cleanup after ourselves, so we don't get any memory leaks
    return function cleanup() {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [value])

  return (
    <>
      {value && (
        <Tooltip
          content={
            /* In this instance we stack our text instead of only using a Box with padding we can hen also define a space between items */
            <Stack space={2} padding={3}>
              <Text align="center" size={1}>
                {`${reference.title}` || 'No title found'}
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
      )}
      {!value && <>{renderDefault(props)}</>}
    </>
  )
}
const InlineAnnotation = styled.span`
  padding-left: 0.3em;
  padding-right: 0.2em;
`
const Icon = styled(BookIcon)`
  color: ${(props) => props.theme.sanity.color.base.border};
  padding-right: 5px;
`
export default PublicationAnnotation
