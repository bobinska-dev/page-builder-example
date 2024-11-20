import { Flex } from '@sanity/ui'
import { ComponentType } from 'react'
import { DocumentInspectorProps, useTranslation } from 'sanity'
import { TableOfContentsPluginOptions } from '../../tableOfContentsPlugin'
import InspectorBody from './InspectorBody'
import { InspectorHeader } from './InspectorHeader'

/** ## Table of Content Inspector Props
 *
 * This interface defines the props that the `TableOfContentsInspector` component receives
 * and extends the {@link DocumentInspectorProps} interface.
 *
 * @param config - is the configuration object for the plugin.
 *
 */
export interface TableOfContentsProps extends DocumentInspectorProps {
  config: TableOfContentsPluginOptions
}

const TableOfContentsInspector: ComponentType<TableOfContentsProps> = (
  props,
) => {
  const { onClose } = props
  const { t } = useTranslation('table-of-contents')
  return (
    <Flex direction="column" height="fill" overflow="hidden">
      {/*
       * * * * HEADER * * * *
       */}
      <InspectorHeader
        as="header"
        closeButtonLabel={t('inspector.close-button-aria-label')}
        flex="none"
        onClose={onClose}
        title={t('table-of-contents-plugin.title')}
      />
      {/*
       * * * * BODY * * * *
       */}
      <InspectorBody {...props} />
    </Flex>
  )
}
export default TableOfContentsInspector
