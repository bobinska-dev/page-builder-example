import { singletonTypes } from '@/sanity/schemas/singletons'
import { StructureBuilder, StructureResolverContext } from 'sanity/structure'

/** # singletonListItems
 *
 * maps over `singletonTypes` array of `DocumentDefinition[]` to get a list of listItems for all the singleton types in the project.
 *
 * @param S - a `StructureBuilder` object
 * @param context - a `StructureResolverContext` object
 *
 * @returns a list of listItems for all the singleton types in the project.
 *
 */
export const singletonListItems = (
  S: StructureBuilder,
  context?: StructureResolverContext,
) =>
  singletonTypes.map((typeDef) => {
    return S.listItem()
      .title(typeDef.title!)
      .icon(typeDef.icon)
      .schemaType(typeDef.name)
      .id(typeDef.name)
      .child(
        S.editor()
          .id(typeDef.name)
          .schemaType(typeDef.name)
          .documentId(typeDef.name),
      )
  })
