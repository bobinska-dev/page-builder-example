import { apiVersion, DOMAIN } from '@/sanity/lib/api'
import { Card, Flex, Stack, Text } from '@sanity/ui'
import { ComponentType, useEffect, useState } from 'react'

import { getIdPair, SlugInputProps, useClient, useFormValue } from 'sanity'

const SlugInput: ComponentType<SlugInputProps> = (props) => {
  const docType = useFormValue(['_type']) as String
  const docSlug = useFormValue(['slug']) as { current: string }
  const client = useClient({ apiVersion }).withConfig({
    perspective: 'previewDrafts',
  })
  const id = useFormValue(['_id']) as string
  const publishedId = getIdPair(id)?.publishedId

  const [isHomePage, setIsHomePage] = useState(false)
  useEffect(() => {
    publishedId &&
      client
        .fetch(`*[_type == 'siteSettings'][0].homePage._ref == $documentId`, {
          documentId: publishedId,
        })
        .then((res) => {
          setIsHomePage(res)
        })
        .catch(console.error)
  }, [])
  const path = () => {
    // TODO: Add more cases for different document types & add the correct path for nested pages
    if (docType === 'news') {
      return `news/${docSlug?.current ?? '???'}`
    } else {
      return `${docSlug ? docSlug.current : '???'}`
    }
  }

  return (
    <div>
      <Flex gap={2} paddingBottom={3}>
        {isHomePage && (
          <Stack space={4}>
            <Text size={1} muted>
              This page is set as the home page, so the slug will be ignored.
            </Text>{' '}
            <a href={DOMAIN + path()} rel="noreferrer" target="_blank">
              <Text size={1} muted>
                Url: {DOMAIN}
              </Text>
            </a>
          </Stack>
        )}
        {!isHomePage && (
          <>
            <Text size={1} muted>
              Full Url:
            </Text>
            <a href={DOMAIN + path()} rel="noreferrer" target="_blank">
              <Text size={1} muted>
                {DOMAIN}
                {path()}
              </Text>
            </a>
          </>
        )}
      </Flex>
      <Card>{props.renderDefault(props)}</Card>
    </div>
  )
}

export default SlugInput
