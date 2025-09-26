import { LinkIcon } from '@sanity/icons'
import { Box, Text, Tooltip } from '@sanity/ui'
import { ComponentType, useEffect, useState } from 'react'
import { Subscription } from 'rxjs'
import { BlockAnnotationProps, useClient } from 'sanity'
import styled from 'styled-components'
import { sleep } from '@/sanity/lib/utils/sleep'

// We need to extend the value of our BlockAnnotationProps, so we can add the value types for later use
export type BlockAnnotationPropsWithValueTypes = BlockAnnotationProps & {
  value?: {
    type: string
    _key: string
    href?: string
    reference?: {
      _ref: string
      _type: string
    }
  }
}

// We define the type of our referenced data here, so we can use it in our component
interface ReferenceProps {
  _type: string
  title: string
}

const LinkAnnotationRenderer: ComponentType<
  BlockAnnotationPropsWithValueTypes
> = (props) => {
  const type = props.value.type
  const referencedDocId = props.value.reference?._ref || ''

  // in order to be able to query for data in the studio, you need to setup a client with api version
  const client = useClient({
    apiVersion: '2023-06-01',
  })

  /*
   * if the link is internal ...
   */
  const [reference, setReference] = useState<ReferenceProps>()
  // we need to initialise the subscription so we can then listen for changes
  let subscription: Subscription

  // then get the data from the referenced document
  useEffect(() => {
    // so let's setup the query and params to fetch the values we need.
    const query = `*[_id == $ref]{title, _type}[0]`
    const params = { ref: referencedDocId }

    const fetchReference = async (listening = false) => {
      listening && (await sleep(1500)) // chances are the data isn't query-able yet, so we wait a bit

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      subscription = client
        .listen(query, params, { visibility: 'query' })
        .subscribe(() => fetchReference(true))
    }
    // we only want to run the fetchReference function if we have a reference set in the first place
    referencedDocId ? fetchReference().then(listen) : null

    // and then we need to cleanup after ourselves, so we don't get any memory leaks
    return function cleanup() {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [referencedDocId])

  // we need to define the text we want to display in the tooltip depending on the type of link (internal or external)
  const text =
    type === 'internal'
      ? `Title: ${reference?.title}` || 'No reference set'
      : `To: ${props.value.href}` || 'No url found'

  return (
    <>
      <Tooltip
        content={
          <Box padding={3}>
            <Text align="center" muted size={1}>
              {text}
            </Text>
          </Box>
        }
        fallbackPlacements={['right', 'left']}
        placement="bottom"
        portal
      >
        {/* We add a bit of styling to the span surrounding annotated text */}
        <InlineAnnotation>
          {/* renderDefault() does the heavy lifting for us */}
          <LinkIcon /> {props.renderDefault(props)}
        </InlineAnnotation>
      </Tooltip>
    </>
  )
}
const InlineAnnotation = styled.span`
  padding-left: 0.3em;
  padding-right: 0.2em;
`
export default LinkAnnotationRenderer
