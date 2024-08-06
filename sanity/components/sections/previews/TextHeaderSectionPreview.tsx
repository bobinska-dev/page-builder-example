import { TextHeaderSection } from '@/sanity.types'
import { TextIcon } from '@sanity/icons'
import { ComponentType } from 'react'
import { PreviewProps } from 'sanity'
import ContentArrayPreviewContainer from '../container/PreviewContainer'

type TextHeaderSectionPreviewProps = PreviewProps & TextHeaderSection

const TextHeaderSectionPreview: ComponentType<TextHeaderSectionPreviewProps> = (
  props,
) => {
  return (
    <ContentArrayPreviewContainer
      type="Text Header Section"
      title={props.title as string}
      body={props.body}
      icon={<TextIcon />}
    />
  )
}

export default TextHeaderSectionPreview
