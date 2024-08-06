import { UlistIcon } from '@sanity/icons'
import { defineDocumentInspector, DocumentInspectorMenuItem } from 'sanity'
import BodyStructureInspector from './BodyStructureInspector'

function useMenuItem(): DocumentInspectorMenuItem {
  return {
    icon: UlistIcon,
    showAsAction: true,
    title: 'Table of Contents',
  }
}

export const tableOfContentsInspector = defineDocumentInspector({
  name: 'tableOfContents',
  component: BodyStructureInspector,
  useMenuItem,
})
