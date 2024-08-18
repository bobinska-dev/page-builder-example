import Link from 'next/link'
import { ComponentType } from 'react'

const MenuLink: ComponentType<{
  href: string
  title: string
  children?: any
}> = ({ href, title, children }) => {
  return (
    <Link
      className={`text-lg hover:text-black md:text-xl text-gray-600
      `}
      href={href}
    >
      {children ? children : title}
    </Link>
  )
}

export default MenuLink
