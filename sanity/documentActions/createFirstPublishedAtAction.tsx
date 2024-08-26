import {
  DocumentActionComponent,
  DocumentActionProps,
  isValidationErrorMarker,
  SanityDocument,
  useDocumentOperation,
  useValidationStatus,
} from 'sanity'

/** ### publish action with patch of `firstPublishedAt` value
 *
 * This is a custom action that will be used instead of the default publish action
 * you can also add the DocumentActionsContext to `createFirstPublishedAtAction` as a prop if you want to get the `currentUser` etc. passed down as well.
 *
 * Add this to your sanity.config.ts
 *
 * ```ts
 *         if (context.schemaType === 'product') {
 *          const originalAction = actions.find((action) => action.action === 'publish')
 *          return [
 *            createFirstPublishedAtAction(originalAction),
 *            ...actions.filter((action) => action.action !== 'publish'),
 *          ]
 * },
 * ```
 * @param originalAction
 *
 * You can also filter these actions depending on a user role within the `sanity.config.ts` file
 */

export function createFirstPublishedAtAction(
  originalAction: DocumentActionComponent,
): DocumentActionComponent {
  return (props: DocumentActionProps) => {
    const originalResult = originalAction(props)
    const documentOperations = useDocumentOperation(props.id, props.type)
    const { patch, publish } = documentOperations

    // this action function has to return a function, that in turn returns an object
    const id = props.id as string
    const schemaType = props.type as string

    // check if Validation is ongoing and get the errors (and check if there are true errors)
    const validationStatus = useValidationStatus(id, schemaType)
    const hasValidationErrors = validationStatus.validation.some(
      isValidationErrorMarker,
    )

    // check if the document is already published (default publish action is disabled if it is)
    const isDisabled =
      hasValidationErrors || publish.disabled === 'ALREADY_PUBLISHED'

    return {
      //use all the props from the original publish action. This gives us validation etc.
      ...originalResult,
      // but override the disabled state with our own depending on the validation and publish status
      disabled: isDisabled,
      // except for the handler.
      onHandle: () => {
        // Set firstPublishedAt to current date and time in the published document
        patch.execute(
          [{ setIfMissing: { firstPublishedAt: new Date().toISOString() } }],
          props.published as SanityDocument | undefined,
        )
        // Perform the publish
        publish.execute()
        // Signal that the action is completed
        props.onComplete()
      },
      //and the label
      label: 'Publish directly',
    }
  }
}
