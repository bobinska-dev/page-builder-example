import type { Path, PortableTextSpan } from 'sanity'

// * * * * Useful Studio related types  * * * *

/** Type for validations of blocks in the Studio */
export interface ForbiddenLocationPTE {
  matchText?: string
  message: string
  offset: number
  path: Path
  span: PortableTextSpan
  level: 'error' | 'info' | 'warning'
}
/** Type for menu item schema type in the Studio */
export interface MenuItemValue {
  title: string
  isNested: boolean
  link?: {
    _type: string
    _ref: string
  }
  _type: string
  _key: string
  menuItems?: MenuItemValue[]
}
