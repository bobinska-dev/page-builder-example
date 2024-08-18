import {
  AccordionSection,
  CtaBannerSection,
  FurtherLinkSection,
  ImageHeaderSection,
  NewsSection,
  TestimonialSection,
  TextHeaderSection,
  TextSection,
} from '@/sanity.types'
import { ArrayRule, ObjectItem } from 'sanity'

// Define a union type for the sections
type PageBuilderSection =
  | TextHeaderSection
  | ImageHeaderSection
  | TextSection
  | AccordionSection
  | FurtherLinkSection
  | CtaBannerSection
  | NewsSection
  | TestimonialSection
  | ObjectItem

// Use an intersection type to combine the union type with the additional properties
type ContentArrayItem = PageBuilderSection & { _key: string }

const headerTypes = ['imageHeaderSection', 'textHeaderSection']
/** ### Page header Validation: Header on top
 *
 * Validation to ensure header sections are on top validation
 *
 * @param {ArrayRule} Rule
 * @returns
 */
export const headersAreOnTopValidation = (
  Rule: ArrayRule<(ContentArrayItem & { _key: string })[]>,
) =>
  Rule.custom((content) => {
    const headers = (content || []).filter((item) =>
      headerTypes.includes(item._type!),
    )
    // header index
    const headerIndex = headers.map((header) => content?.indexOf(header))
    // headerPaths for error message
    const headerPaths = headers.map((header) => [{ _key: header._key }])

    return headerIndex[0] === 0
      ? true
      : {
          message: 'Header section should be at the top of the content array',
          paths: headerPaths,
        }
  })

/** ### Page header Validation: Only one header
 *
 * Validation to ensure only one header sections is present in the content array
 *
 * @param {ArrayRule} Rule
 * @returns
 */
export const onlyOneHeaderValidation = (
  Rule: ArrayRule<(ContentArrayItem & { _key: string })[]>,
) =>
  Rule.custom((content) => {
    // get all headers in array
    const headers = (content || []).filter((item) =>
      headerTypes.includes(item._type!),
    )
    // headerPaths for error message
    const headerPaths = headers.map((header) => [{ _key: header._key }])

    return headerPaths.length === 1
      ? true
      : {
          message: 'There can only be one header section. Please delete one.',
          paths: headerPaths,
        }
  })
