import { UlistIcon } from '@sanity/icons'
import { ComponentType, useCallback } from 'react'
import { FieldProps } from 'sanity'
import { useDocumentPane } from 'sanity/structure'

export const BodyFieldWithActions: ComponentType<FieldProps> = (props) => {
  return props.renderDefault({
    ...props,
    actions: [
      {
        name: 'tableOfContents',
        useAction: () => {
          const { inspector, openInspector } = useDocumentPane()
          const handleOpenContentInspector = useCallback(() => {
            if (inspector?.name === 'tableOfContents') return
            openInspector('tableOfContents')
          }, [inspector?.name, openInspector])
          return {
            type: 'action',
            title: 'Table of Contents',
            renderAsButton: true,
            icon: UlistIcon,
            onAction: () => {
              handleOpenContentInspector()
            },
          }
        },
      },
      ...(props.actions ?? []),
    ],
  })
}
