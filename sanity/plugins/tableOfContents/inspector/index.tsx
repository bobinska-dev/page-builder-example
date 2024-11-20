import { UlistIcon } from '@sanity/icons'
import React from 'react'
import {
  defineDocumentInspector,
  DocumentInspectorMenuItem,
  useTranslation,
} from 'sanity'
import { TableOfContentsPluginOptions } from '../tableOfContentsPlugin'
import TableOfContentsInspector from './components/TableOfContentsInspector'

function useMenuItem(): DocumentInspectorMenuItem {
  const { t } = useTranslation('table-of-contents')
  return {
    icon: UlistIcon,
    showAsAction: true,
    title: t('table-of-contents-plugin.title'),
  }
}

export const tableOfContentsInspector = (props: TableOfContentsPluginOptions) =>
  defineDocumentInspector({
    name: 'tableOfContents',
    component: (inspectorProps) => (
      <TableOfContentsInspector {...inspectorProps} config={props} />
    ),
    useMenuItem,
  })
