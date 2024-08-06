import { Layer, useClickOutsideEvent, useLayer, useToast } from '@sanity/ui'
import { ComponentType, useCallback, useRef, useState } from 'react'
import { DocumentInspectorProps } from 'sanity'
import styled from 'styled-components'
import { HeadingsList } from './HeadingsList'
import { InspectorHeader } from './InspectorHeader'

const BodyStructureInspector: ComponentType<DocumentInspectorProps> = (
  props,
) => {
  const { onClose, documentId } = props

  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const didScrollToCommentFromParam = useRef<boolean>(false)
  const pushToast = useToast().push
  const { isTopLayer } = useLayer()
  const handleDeselectPath = useCallback(() => {
    // Clear the selected path when:
    // - Clicking outside the inspector when it's the top layer
    // - The target is not a slate editor string. This is needed because we do not want to
    //   frequently deselect the selected path when clicking inside the editor.
    if (selectedPath && isTopLayer) {
      setSelectedPath(null)
    }
  }, [isTopLayer, selectedPath, setSelectedPath])

  useClickOutsideEvent(
    (event) => {
      // Clear the selected path when clicking outside the comments inspector.
      // We do this only when the comments inspector is the top layer.
      const isPTETarget =
        event.target instanceof HTMLElement &&
        event.target?.hasAttribute('data-slate-string')

      if (!isPTETarget) {
        handleDeselectPath()
      }
    },
    () => [rootRef.current],
  )
  return (
    <RootLayer>
      <InspectorHeader onClose={onClose} />
      <HeadingsList documentId={documentId} />
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
