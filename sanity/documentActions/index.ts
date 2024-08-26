import { DocumentActionComponent, DocumentActionsContext } from 'sanity'
import { createFirstPublishedAtAction } from './createFirstPublishedAtAction'
import { createNewDuplicateAction } from './createNewDuplicationAction'

/** # custom document Actions settings
 *
 * This file is used to customize the document actions in the studio.
 */
export const documentActions = (
  prev: DocumentActionComponent[],
  context: DocumentActionsContext,
) => {
  // * Add custom publish action to certain schema types
  if (['page', 'news'].includes(context.schemaType)) {
    return prev.map((originalAction) =>
      originalAction.action === 'duplicate'
        ? // ? createCustomDuplicateAction(originalAction)
          createNewDuplicateAction(originalAction)
        : originalAction.action === 'publish'
          ? createFirstPublishedAtAction(originalAction)
          : originalAction,
    )
  }

  // *  if those conditions are not met, return the original actions (sometimes called prev)
  return [
    ...prev.map(
      (originalAction) =>
        /*       originalAction.action === 'publish'
        ? createFirstPublishedAtAction(originalAction) 
        : */ originalAction,
    ),
  ]
}
