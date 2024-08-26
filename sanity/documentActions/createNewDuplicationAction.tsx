import { apiVersion } from '@/sanity/lib/api'
import { uuid } from '@sanity/uuid'
import { omit } from 'lodash'
import { DocumentActionComponent, DocumentActionProps, useClient } from 'sanity'
import { useRouter } from 'sanity/router'

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

export function createNewDuplicateAction(
  originalAction: DocumentActionComponent,
  /* context: DocumentActionsContext */
): DocumentActionComponent {
  return (props: DocumentActionProps) => {
    const { draft, published } = props
    const originalResult = originalAction(props)
    const { navigateIntent } = useRouter()
    const client = useClient({ apiVersion })

    const schemaType = props.type as string
    // omit these properties from the new document
    const omitProps = [
      '_id',
      '_rev',
      '_createdAt',
      '_updatedAt',
      'firstPublishedAt',
    ]
    // new draft document ID
    const newDraftId = `drafts.${uuid()}`

    // omit the omitProps from either the draft or published document version passed down in the props, typed as a partial Document
    const newDocProps = {
      ...omit(draft ? draft : published, omitProps),
    } as { _type: string; [key: string]: any }

    // create the new document object with the new draft ID
    const newDocument = {
      ...newDocProps,
      _id: newDraftId,
      title: `Copy of: ${newDocProps.title}`,
    }

    const duplicateItem = () => {
      // create the new document
      client.create(newDocument)
      // navigate to the new document
      navigateIntent('edit', {
        id: newDraftId,
        type: schemaType,
        template: 'page-duplication-template',
      })
    }

    return {
      //use all the props from the original publish action. This gives us validation etc.
      ...originalResult,
      // except for the handler.
      onHandle: () => {
        duplicateItem()
        // Signal that the action is completed
        props.onComplete()
      },
      //and the label
      label: 'Duplicate Without Published At',
    }
  }
}
