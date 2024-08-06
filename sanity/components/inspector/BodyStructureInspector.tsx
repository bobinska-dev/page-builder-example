import { Layer } from '@sanity/ui'
import { ComponentType } from 'react'
import { DocumentInspectorProps } from 'sanity'
import styled from 'styled-components'
import { InspectorHeader } from './InspectorHeader'
import { MultipleBodyTableOfContents } from './MultipleBodyTableOfContents'
import { TableOfContents } from './TableOfContents'

export type TableOfContentsProps = {
  documentId: string
}
const BodyStructureInspector: ComponentType<DocumentInspectorProps> = (
  props,
) => {
  const { onClose, documentId, documentType } = props

  return (
    <RootLayer>
      <InspectorHeader onClose={onClose} />
      {documentType === 'news' && <TableOfContents documentId={documentId} />}
      {documentType === 'page' && (
        <MultipleBodyTableOfContents documentId={documentId} />
      )}
    </RootLayer>
  )
}
export default BodyStructureInspector

const RootLayer = styled(Layer)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`
