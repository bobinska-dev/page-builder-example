import { resolveHref } from '@/sanity/lib/utils'
import { MenuItem as MenuItemType } from '@/types'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ComponentType } from 'react'
import { VscChevronDown } from 'react-icons/vsc'
import MenuLink from './MenuLink'

export const DropDownMenuLink: ComponentType<MenuItemType> = (props) => {
  const { _key, slug, docType, menuItems, title } = props
  return (
    <Menu as="div" className="relative inline-block text-center" key={_key}>
      <div className="w-full">
        <MenuButton
          className="inline-flex w-full justify-center items-center gap-x-1.5 text-lg hover:text-black md:text-xl text-gray-600 cursor-pointer"
          as="a"
        >
          {title}
          <VscChevronDown
            aria-hidden="true"
            className="-mr-1 h-3 w-3 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute inset-x-0 md:right-0 z-10 mt-2 w-56 origin-center md:origin-top-right -translate-x-7 md:translate-x-[5rem] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="p-3 flex flex-col items-center justify-center w-full">
          {menuItems?.map((item) => (
            <MenuItem key={item._key}>
              <div className="pb-2">
                <MenuLink
                  href={resolveHref(item.docType, item.slug) ?? ''}
                  title={item.title}
                />
              </div>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
