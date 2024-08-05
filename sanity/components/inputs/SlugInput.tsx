import { DOMAIN } from '@/sanity/lib/api'
import { Card, Flex, Text } from '@sanity/ui'
import { ComponentType } from 'react'

import { SlugInputProps, useFormValue } from 'sanity'

const SlugInput: ComponentType<SlugInputProps> = (props) => {
  const docType = useFormValue(['_type']) as String
  const docSlug = useFormValue(['slug']) as { current: string }

  const path = () => {
    // TODO: Add more cases for different document types
    if (docType === 'news') {
      return `/news/${docSlug?.current ?? '???'}`
    } else {
      return `/${docSlug ? docSlug.current : '???'}`
    }
  }

  return (
    <div>
      <Flex gap={2} paddingBottom={3}>
        <Text size={1} muted>
          Full Url:
        </Text>
        <a href={DOMAIN + path()} rel="noreferrer" target="_blank">
          <Text size={1} muted>
            {DOMAIN}
            {path()}
          </Text>
        </a>
      </Flex>
      <Card>{props.renderDefault(props)}</Card>
    </div>
  )
}

export default SlugInput
