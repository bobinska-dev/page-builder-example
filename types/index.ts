import type { PortableTextBlock } from 'next-sanity'
import type { Image, Path, PortableTextSpan } from 'sanity'
export declare const internalGroqTypeReferenceTo: unique symbol
export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  title?: string
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}

// * * * NEW * * *
export interface ForbiddenLocationPTE {
  matchText?: string
  message: string
  offset: number
  path: Path
  span: PortableTextSpan
  level: 'error' | 'info' | 'warning'
}

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
export interface FooterQuickLink {
  _ref: string
  _key: string
  _type: string
}

export interface Button {
  _type: 'button'
  title?: string
  type?: 'internal' | 'external' | 'functional' | 'file'
  linkExternal?: string
  linkInternal?: {
    _ref: string
    _type: 'reference'
    slug: string
    title: string
  }
  file?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.fileAsset'
    }
    _type: 'file'
  }
  url?: string
  functional?: 'contact' | 'subscribe'
}
