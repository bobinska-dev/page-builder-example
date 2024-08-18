import { urlForImage } from '@/sanity/lib/utils'
import type { MenuItem as MenuItemType, SettingsPayload } from '@/types'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { VscClose, VscMenu } from 'react-icons/vsc'
import { DropDownMenuLink } from './menu/DropDownMenuLink'
import MenuLink from './menu/MenuLink'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menu = data?.menu || ([] as MenuItemType[])
  const logoSrc = urlForImage(data?.logos?.logoColor)?.width(200).url() || ''

  return (
    <Disclosure as="nav" className="">
      <div className="sticky top-0 z-10 mx-auto max-w-7xl flex flex-wrap items-center justify-between sm:justify-normal gap-x-5 bg-white/80 px-4 py-3 backdrop-blur sm:px-6 md:px-16 md:py-3 lg:px-32">
        {/* new */}
        <div className="flex h-16 items-center justify-center sm:justify-between">
          {/*
           * Menu Items
           */}
          <div className="relative flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/*
             * * * Logo * * *
             */}
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <Image
                  src={logoSrc}
                  alt={data?.logos?.logoColor?.altText || 'Logo'}
                  width={100}
                  height={20}
                />
              </Link>
            </div>
            {/*
             * * * Links * * *
             */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {menu &&
                  menu.map((menuItem, key) => {
                    if (menuItem.menuItems) {
                      return <DropDownMenuLink key={key} {...menuItem} />
                    }
                    return (
                      <MenuLink
                        key={key}
                        href={menuItem.slug!}
                        title={menuItem.title}
                      />
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
        {/*
         * Mobile menu button
         */}
        <div className=" inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            <VscMenu
              aria-hidden="true"
              className="block h-5 w-5 group-data-[open]:hidden"
            />
            <VscClose
              aria-hidden="true"
              className="hidden h-5 w-5 group-data-[open]:block"
            />
          </DisclosureButton>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col items-center">
          {menu &&
            menu.map((menuItem) => {
              if (menuItem.menuItems) {
                return <DropDownMenuLink key={menuItem._key} {...menuItem} />
              }
              return (
                <MenuLink
                  key={menuItem._key}
                  href={menuItem.slug!}
                  title={menuItem.title}
                >
                  <DisclosureButton
                    key={menuItem._key}
                    as="a"
                    href={menuItem.slug}
                  >
                    {menuItem.title}
                  </DisclosureButton>
                </MenuLink>
              )
            })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
const oldNav = () => {
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-x-5 bg-white/80 px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32">
      {/*
       * * * LOGO * * *
       */}
      {/*         <Link href="/">
          <div>
            <Image
              src={logoSrc}
              alt={data?.logos?.logoColor?.altText || 'Logo'}
              width={100}
              height={20}
            />
          </div>
        </Link> */}
      {/*
       * * * Menu Items * * *
       */}
      {/*         {menu &&
          menu.map((menuItem, key) => {
            console.log(menuItem)
            const href = resolveHref(menuItem?.docType, menuItem?.slug)
            if (!href) {
              return null
            }
            if (menuItem.menuItems) {
              return (
                <div key={key} className="relative group">
                  <Link
                    className={`text-lg hover:text-black md:text-xl ${
                      menuItem?._type === 'home'
                        ? 'font-extrabold text-black'
                        : 'text-gray-600'
                    }`}
                    href={href}
                  >
                    {menuItem.title}
                  </Link>
                  <div className="hidden group-hover:block absolute top-full left-0 bg-white/80 p-2 shadow-md">
                    {menuItem.menuItems.map((subMenuItem, subKey) => {
                      const subHref = resolveHref(
                        subMenuItem?.docType,
                        subMenuItem?.slug,
                      )
                      if (!subHref) {
                        return null
                      }
                      return (
                        <Link
                          key={subKey}
                          className="block text-gray-600 hover:text-black"
                          href={subHref}
                        >
                          {subMenuItem.title}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            }
            return (
              <Link
                key={key}
                className={`text-lg hover:text-black md:text-xl ${
                  menuItem?._type === 'home'
                    ? 'font-extrabold text-black'
                    : 'text-gray-600'
                }`}
                href={href}
              >
                {menuItem.title}
              </Link>
            )
          })} */}
    </div>
  )
}
