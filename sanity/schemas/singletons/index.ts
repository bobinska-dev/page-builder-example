import { DocumentDefinition } from 'sanity'

import { deletedDocBinDocument } from './bin-solution/deletedDocBinDocument'
import siteSettings from './siteSettings'

/** # All singletonTypes
 *
 * This is a list of all the singleton types in the project.
 *
 * @type {DocumentDefinition[]}
 *
 */
export const singletonTypes: DocumentDefinition[] = [
  siteSettings,
  deletedDocBinDocument,
]

/** # All singletonTypeNames
 *
 * maps over `singletonTypes` array of `DocumentDefinition[]` to get a list of all the names of the singleton types in the project.
 *
 * @param singletonTypes - an array of `DocumentDefinition[]`
 */
export const allSingletonTypeNames = singletonTypes.map(
  (typeDef) => typeDef.name,
)
