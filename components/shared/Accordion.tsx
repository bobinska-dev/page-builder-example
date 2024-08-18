import { AccordionSectionPayload } from '@/types'
import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import { ComponentType, forwardRef } from 'react'
import { VscChevronDown } from 'react-icons/vsc'
import { CustomPortableText } from './CustomPortableText'
// import { ChevronDownIcon } from '@radix-ui/react-icons'

const AccordionComponent: ComponentType<AccordionSectionPayload> = (props) => {
  const accordionItems = props.accordion
  return (
    <Accordion.Root
      className="sm:w-[50vw] my-5 mx-auto rounded-md shadow-[0_2px_10px] shadow-green-800/20"
      type="single"
      defaultValue="item-0"
      collapsible
    >
      {accordionItems &&
        accordionItems?.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={item._key}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              {item.body && (
                <CustomPortableText paragraphClasses="" value={item.body} />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion.Root>
  )
}

const AccordionItem = forwardRef<HTMLDivElement, Accordion.AccordionItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={classNames(
        'focus-within:shadow-green-800/50 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_2px_1px]',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  ),
)

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  Accordion.AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={classNames(
        'font-semibold tracking-tight md:text-xl text-gray-700 hover:text-black group flex h-[45px] flex-1 cursor-default items-center justify-between  px-5 leading-none shadow-[0_1px_0] outline-none',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <VscChevronDown
        className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
))

const AccordionContent = forwardRef<
  HTMLDivElement,
  Accordion.AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames(
      'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
      className,
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[15px] px-5">{children}</div>
  </Accordion.Content>
))

export default AccordionComponent
