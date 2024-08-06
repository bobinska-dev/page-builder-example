import { UlistIcon } from '@sanity/icons'
import { defineDocumentInspector, DocumentInspectorMenuItem } from 'sanity'
import BodyStructureInspector from './BodyStructureInspector'

function useMenuItem(): DocumentInspectorMenuItem {
  return {
    icon: UlistIcon,
    showAsAction: true,
    title: 'Text Structure',
  }
}

export const bodyStructureInspector = defineDocumentInspector({
  name: 'bodySructureInspector',
  component: BodyStructureInspector,
  useMenuItem,
})
