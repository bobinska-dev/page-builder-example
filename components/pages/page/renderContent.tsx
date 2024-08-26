import AccordionComponent from '@/components/shared/Accordion'
import NewsCarousel from '@/components/shared/carousel/NewsCarousel'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import {
  HeaderPortableText,
  HeaderXPortableText,
} from '@/components/shared/HeaderPortableText'
import TestimonialCard from '@/components/shared/TestimonialCard'
import { urlForImage } from '@/sanity/lib/utils'
import { PagePayload, TestimonialPayload } from '@/types'
import { PortableText } from 'next-sanity'
import Link from 'next/link'
import { Image as ImageType } from 'sanity'

export const renderContent = async (content: PagePayload['content']) =>
  content.map((section) => {
    if (section._type === 'imageHeaderSection') {
      const imageUrl =
        section.image &&
        urlForImage(section.image as ImageType)
          ?.height(500)
          .width(800)
          .fit('max')
          .quality(70)
          .url()

      return (
        <div
          className={`mb-10 w-full h-[40vh] md:h-[50vh] overflow-hidden rounded-[3px] bg-gray-50`}
          data-sanity={section['data-sanity']}
          style={{
            backgroundImage: `url("${imageUrl}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="h-full w-full flex flex-col items-center align-middle justify-center px-5 text-center bg-opacity-90 bg-green-950">
            {section.title && (
              <PortableText
                components={{
                  block: {
                    normal: ({ children }) => (
                      <h1
                        className={
                          'text-3xl font-extrabold tracking-tight md:text-5xl py-3 text-white leading-relaxed'
                        }
                      >
                        {children}
                      </h1>
                    ),
                  },
                }}
                value={section.title}
              />
            )}
            {section.subtitle && (
              <PortableText
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p
                        className={
                          'text-lg font-bold tracking-tight md:text-xl py-3 text-white'
                        }
                      >
                        {children}
                      </p>
                    ),
                  },
                }}
                value={section.subtitle}
              />
            )}
          </div>
        </div>
      )
    }
    if (section._type === 'textHeaderSection') {
      // TODO: finish textHeaderSection
      return (
        <div className="mb-10 ">
          {section.title && (
            <HeaderXPortableText value={section.title} level={1} />
          )}
          {section.subtitle && (
            <PortableText
              components={{
                block: {
                  normal: ({ children }) => (
                    <p
                      className={
                        'text-lg font-semibold tracking-tight md:text-xl py-3'
                      }
                    >
                      {children}
                    </p>
                  ),
                },
              }}
              value={section.title}
            />
          )}
          {section.body && (
            <CustomPortableText paragraphClasses="" value={section.body} />
          )}
        </div>
      )
    }
    if (section._type === 'textSection') {
      return (
        <div className="mb-10 ">
          {section.title && <HeaderPortableText value={section.title} />}
          {section.subtitle && (
            <CustomPortableText
              paragraphClasses="italic font-bold pb-5"
              value={section.subtitle}
            />
          )}
          {section.body && (
            <CustomPortableText paragraphClasses="" value={section.body} />
          )}
        </div>
      )
    }
    if (section._type === 'accordionSection') {
      return (
        <div className="mb-10 ">
          {section.title && <HeaderPortableText value={section.title} />}
          {section.body && (
            <CustomPortableText paragraphClasses="" value={section.body} />
          )}
          {section.accordion && (
            <div>
              <AccordionComponent {...section} />
            </div>
          )}
        </div>
      )
    }
    if (section._type === 'ctaBannerSection') {
      return (
        <div className="mb-10 rounded-md shadow-[0_2px_10px] border-2 shadow-green-600/30 px-3 py-5 text-center md:py-5">
          {section.title && (
            <HeaderPortableText value={section.title} paragraphClasses="" />
          )}
          {section.body && (
            <CustomPortableText paragraphClasses="" value={section.body} />
          )}
        </div>
      )
    }
    if (section._type === 'furtherLinkSection') {
      return (
        <div className="mb-10 ">
          {section.title && <HeaderPortableText value={section.title} />}
          {section.body && (
            <CustomPortableText paragraphClasses="" value={section.body} />
          )}
          {section.links && (
            <div className="flex flex-col gap-4 justify-items-stretch justify-evenly py-6 md:max-w-[60vw] lg:max-w-[40vw] m-auto">
              {section.links.map((link) => (
                <Link href={link.url || link.slug || ''}>
                  <div
                    key={link._key}
                    className="flex flex-col justify-center gap-1 border p-3 "
                  >
                    <HeaderXPortableText
                      value={link.title}
                      level={3}
                      paragraphClasses="text-lg font-semibold md:text-xl text-gray-800"
                    />
                    {link.description && (
                      <CustomPortableText
                        paragraphClasses="max-w-3xl text-gray-600 text-sm"
                        value={link.description}
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )
    }
    if (section._type === 'testimonialSection') {
      // console.log('VALUE', section)
      return (
        <div className="mb-10 ">
          {section.title && <HeaderPortableText value={section.title} />}
          {section.body && (
            <CustomPortableText
              paragraphClasses="font-serif max-w-3xl text-gray-600 text-lg"
              value={section.body}
            />
          )}

          {section.testimonials && (
            <div className="flex flex-col ">
              {section.testimonials.map(
                (testimonial: TestimonialPayload & { _key?: string }) => (
                  <TestimonialCard
                    {...testimonial}
                    key={testimonial._key ?? testimonial._id}
                  />
                ),
              )}
            </div>
          )}
        </div>
      )
    }
    if (section._type === 'newsSection') {
      console.log('VALUE', section)
      return (
        <div className="mb-10 ">
          {section.title && <HeaderPortableText value={section.title} />}
          {section.body && (
            <CustomPortableText
              paragraphClasses="font-serif max-w-3xl text-gray-600 text-lg"
              value={section.body}
            />
          )}
          {/*           {section.news && (
            <div className="flex ">
              {section.news.map((newsItem: NewsPayload & { _key: string }) => (
                <NewsCard key={newsItem._key} {...newsItem} />
              ))}
            </div>
          )} */}
          {section.news && <NewsCarousel list={section.news} />}
        </div>
      )
    }
    return <div>Section not known...</div>
  })
