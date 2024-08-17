import { Page } from '@/sanity.types'
import { apiVersion } from '@/sanity/lib/api'
import { Stack } from '@sanity/ui'
import groq from 'groq'
import { ComponentType, useCallback, useEffect, useState } from 'react'
import { Subscription } from 'rxjs'
import { Path, useClient, useSchema } from 'sanity'
import { useDocumentPane } from 'sanity/structure'
import { TableOfContentsProps } from './TableOfContentsInspector'
import ContentSection from './components/Section'

const BODY_FRAGMENT = groq`body[style != 'normal'] {
          _key, _type, style, "text": array::join(children[].text, ' ')
        }
        `

export const MultipleBodyTableOfContents: ComponentType<
  TableOfContentsProps
> = (props) => {
  const client = useClient({ apiVersion }).withConfig({
    perspective: 'previewDrafts',
  })
  const { onFocus, onPathOpen } = useDocumentPane()
  const schema = useSchema()

  // * Open nested buttons input dialog on click
  const handleOpen = useCallback(
    (path: Path) => {
      onPathOpen(path)
      onFocus(path)
    },
    [onFocus, onPathOpen],
  )

  // document value state
  const [documentValue, setDocumentValue] = useState<Page | null>(null)

  // TODO: get listener to work
  // we need to initialise the subscription
  let subscription: Subscription
  // then get the content data from the document
  useEffect(() => {
    const query = groq`*[_id == $documentId && _type == 'page'][0]{
      content[]{
        _type == 'imageHeaderSection' => {
          title,
          _key,
          _type
        },
        _type == "textHeaderSection" => {
          title,
          _key,
          _type,
          ${BODY_FRAGMENT}
        },
        _type == "textSection" => {
          title,
          _key,
          _type,
          ${BODY_FRAGMENT}
        },
        _type == 'accordionSection' => {
          'title':pt::text(title),
          _key,
          ${BODY_FRAGMENT},
          _type,
          accordion[]{
            title,
            _key,
            ${BODY_FRAGMENT}
          }
        },
        _type == 'ctaBannerSection'=> {
          'title':pt::text(title),
          _key,
          _type,
          ${BODY_FRAGMENT}
        },
        _type == 'furtherLinkSection' => {
          'title':pt::text(title),
          _key,
          _type,
          links[]{
            'title':pt::text(title),
            _key,
          }
        },
        _type == 'testimonialSection'=> {
          'title':pt::text(title),
          _key,
          _type,
          ${BODY_FRAGMENT}
        },
        _type == 'newsSection' => {
          'title':pt::text(title),
          _key,
          _type,
          ${BODY_FRAGMENT}
        },
      } // end of content
    }`
    const params = { documentId: props.documentId }

    const fetchContent = async (listening = false) => {
      listening && (await sleep(1500)) // chances are the data isn't query-able yet
      await client
        .fetch(query, params)
        .then((res) => {
          setDocumentValue(res)
        })
        .catch((err) => {
          console.error(err.message)
        })
    }

    // since we store our page content data in a state we need to make sure, we also listen to changes
    const listen = () => {
      subscription = client
        .listen(query, params, {
          visibility: 'query',
        })
        .subscribe(() => fetchContent(true))
    }

    props.documentId && fetchContent().then(listen)

    // and then we need to cleanup after ourselves, so we don't get any memory leaks
    return function cleanup() {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [props.documentId])

  return (
    <Stack space={4} paddingY={4} paddingX={3} style={{ overflowY: 'scroll' }}>
      <Stack space={3} paddingX={3}>
        {documentValue?.content.map((section) => {
          const schemaTypeTitle =
            (section._type && schema.get(section._type)?.title) || ''

          return (
            <ContentSection
              {...section}
              schemaTypeTitle={schemaTypeTitle}
              handleOpen={handleOpen}
              schema={schema}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}
