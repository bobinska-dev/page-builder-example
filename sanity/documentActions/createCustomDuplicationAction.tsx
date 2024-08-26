import { uuid } from '@sanity/uuid'
import { omit } from 'lodash'
import { useMemo } from 'react'
import {
  DocumentActionComponent,
  DocumentActionProps,
  useDocumentOperation,
} from 'sanity'
import { useRouter, useRouterState } from 'sanity/router'
import { RouterPanes } from 'sanity/structure'

/** This is a custom action that will be used instead of the default duplication action
 * you can also add the DocumentActionsContext to `createDuplicateWithoutPublishedAtAction` as a prop if you want to get the `currentUser` etc. passed down as well.
 *
 * Add this to your sanity.config.ts
 *
 * ```ts
 *   if (['page', 'landingPage', 'news', 'job'].includes(context.schemaType)) {
 *     return prev.map((originalAction) =>
 *       originalAction.action === 'duplicate'
 *         ? createDuplicateWithoutPublishedAtAction(originalAction)
 *         : originalAction,
 *     )
 *   }
 * ```
 * @param originalAction
 *
 * You can also filter these actions depending on a user role within the `sanity.config.ts` file
 */

export function createCustomDuplicateAction(
  originalAction: DocumentActionComponent,
  /* context: DocumentActionsContext */
): DocumentActionComponent {
  return (props: DocumentActionProps) => {
    const { draft, published, ...restProps } = props

    const originalResult = originalAction(props)
    const documentOperations = useDocumentOperation(props.id, props.type)
    const { duplicate } = documentOperations
    const { navigate } = useRouter()
    const routerState = useRouterState()

    // this action function has to return a function, that in turn returns an object
    const id = props.id as string
    const schemaType = props.type as string
    const omitProps = [
      '_id',
      '_rev',
      '_createdAt',
      '_updatedAt',
      'firstPublishedAt',
    ]
    // omit the omitProps from either the draft or published document version passed down in the props
    const newDocProps = {
      ...omit(draft ? draft : published, omitProps),
    }
    const routerPaneGroups = useMemo<RouterPanes>(
      () => (routerState?.panes || []) as RouterPanes,
      [routerState?.panes],
    )

    const openPane = () => {
      const nextPanes: RouterPanes = [
        // keep existing panes
        ...routerPaneGroups,
        [
          {
            // Empty document id in order to create a new document.
            id: uuid(),
            params: {
              type: schemaType,
              template: 'page-duplication-template',
              // parentRefPath: pathToString(props.path),
            },
            // this is were you can pass down any field values to the new document
            payload: newDocProps || {},
          },
        ],
      ]

      navigate({
        panes: nextPanes,
      })
    }
    return {
      //use all the props from the original publish action. This gives us validation etc.
      ...originalResult,
      // except for the handler.
      onHandle: () => {
        openPane()
        // Signal that the action is completed
        props.onComplete()
      },
      //and the label
      label: 'Duplicate xx',
    }
  }
}
