import { groq } from 'next-sanity'

// * * * FRAGMENTS * * *
/** ### IMAGE QUERY FRAGMENT
 *
 * This fragment is used to query images from Sanity. It returns the image object with the following properties:
 *
 * - `altText`: The alt text of the image
 * - `blurHashURL`: The blur hash url of the image
 *
 * The `altText` is selected from either the image asset, the field itself, or a default value ('Unfortunately, we forgot to add alt text to this image. We will do better next time!').
 *
 */
export const IMAGE_FRAGMENT = groq`image{
  ...,

    ...asset->{
        "altText": select(
          defined(altText) => @.altText, 
          defined(^.altText) =>  ^.altText, 
          'Unfortunately, we forgot to add alt text to this image. We will do better next time!'),
        'blurHashURL': metadata.lqip,
    }
}`
/** ### BODY QUERY
 *
 * This query is used to query the body of a document. It returns the body with the following properties:
 *
 * - `style`: The style of the body
 * - `listItem`: The list item of the body
 * - `markDefs`: The mark definitions of the body
 * - `children`: The children of the body
 *
 */
export const BODY_FRAGMENT = groq`body[]{
  ...,
  // * ANNOTATIONS
  markDefs[]{
    // * LINK ANNOTATION
    _type == "link" => { 
      type,
      'href': select( 
        type == 'internal' => @.reference->{   
          'slug': slug.current,
          _type
        }, 
        type == 'external' => href 
      ) 
    },
    // * PUBLICATION ANNOTATION
    _type == "publication" =>  { 
      ..., ...@->{ url, title, description, "file": @.file.asset->url } 
      },
    // * NEWS ANNOTATION
    _type == "news" => {
      ...@->{ "slug":slug.current, title, subtitle } },
    
  },
  // * IMAGE BLOCK
  _type == 'imageBlock' => {
    ...,
    ${IMAGE_FRAGMENT}
  },
  // * BUTTONS BLOCK
  _type == 'buttons' => {
    ...,
    buttons[]{
      _key, 
      title,
      type,
      _type,
      type == 'external' => {
        'href': linkExternal
      },
      type == 'internal' => {
        // TODO: Add logic for publication
        ...linkInternal-> { 'slug': slug.current ,'docType':_type  }
      },
      type == 'file' => {
        ...file.asset-> { 'href': url + '?dl' }
      },
      type == 'functional' => {
        ...,
      },
    }
  },
  // * TESTIMONIAL BLOCK
  _type == 'testimonial' => @->,

}`

export const CONTENT_FRAGMENT = groq`content[]{
  ...,
  _type == 'imageHeaderSection' => {
    ...,
    ${IMAGE_FRAGMENT},
  },
  _type == 'textHeaderSection' => {
    ...,
    ${BODY_FRAGMENT}
  },

  _type == 'textSection' => {
    ...,
    ${BODY_FRAGMENT}
  },
  _type == 'accordionSection' => {
    ...,
    ${BODY_FRAGMENT},
    accordion[]{
      ...,
      ${BODY_FRAGMENT}
    }
  },
  _type == 'ctaBannerSection' => {
    ...,
    ${BODY_FRAGMENT},
  },
  _type == 'furtherLinkSection' => {
    ...,
    ${BODY_FRAGMENT},
    links[]{
      ...,
      defined(internalLink)=> {
        ...internalLink->{
          "slug": slug.current,
          "docType": _type
        }
      },
    }
  },
  _type == 'newsSection' => {
    ...,
    ${BODY_FRAGMENT},
    defined(news) && !loadAll => {news[]->{
      ...,
      ${IMAGE_FRAGMENT},
      ${BODY_FRAGMENT},
      'slug': slug.current
    }},
    loadAll => {'news': *[_type == 'news']{
      ...,
      ${IMAGE_FRAGMENT},
      ${BODY_FRAGMENT},
      'slug': slug.current
    }},
  },
  _type == 'testimonialSection' => {
    ...,
    ${BODY_FRAGMENT},
  },
}`

export const PAGE_FRAGMENT = groq`{
    _id,
    title,
    description,
    "slug": slug.current,
    ${CONTENT_FRAGMENT},
    ${IMAGE_FRAGMENT}
  }`

// * * * FULL QUERIES * * *
export const homePageQuery = groq`
  *[_type == "siteSettings"][0].homePage->{
    _id,
    title,
    description,
    "slug": slug.current,
    ${CONTENT_FRAGMENT},
    ${IMAGE_FRAGMENT}
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    description,
    "slug": slug.current,
    ${CONTENT_FRAGMENT},
    ${IMAGE_FRAGMENT}
  }
`

export const settingsQuery = groq`
  *[_type == "siteSettings"][0]{
  menu[]{
    title,
    _key,
    !isNested => {
      ...link->{ 'slug': slug.current, 'docType': _type }
    },
    isNested => {
      menuItems[]{
        title,
        _key, 
        ...link->{ 'slug': slug.current, 'docType': _type }
      }
    }
  },
  quickLinks[]{
    _key,
    ...@->{ 'slug': slug.current, 'docType': _type }
  },
  logos,
  ogImage,
  serverError,
  pageNotFound,
}
`

export const allNewsQuery = groq`*[ _type == 'news' && defined(slug.current) && defined(firstPublishedAt)]{
  _id,
  _type,
  title, 
  description,
  'slug': slug.current,
  firstPublishedAt,
  ${CONTENT_FRAGMENT},
  ${IMAGE_FRAGMENT}
} | order(firstPublishedAt desc)`

export const newsBySlugQuery = groq`*[ _type == 'news' && slug.current == $slug][0]{
  _id,
  _type,
  title, 
  description,
  'slug': slug.current,
  firstPublishedAt,
  ${CONTENT_FRAGMENT},
  ${IMAGE_FRAGMENT}
}`
