import { VscRobot } from 'react-icons/vsc'
import { StructureBuilder } from 'sanity/structure'

export const aiStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title('Reusable AI Instruction (Contexts)')
    .icon(VscRobot)
    .id('aiContexts')
    .child(S.documentTypeList('assist.instruction.context').showIcons(false))
}
