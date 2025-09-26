import { TextSection } from '@/sanity.types'
import { BlockContentIcon } from '@sanity/icons'
import { ComponentType } from 'react'
import { PreviewProps } from 'sanity'
import ContentArrayPreviewContainer from '../container/PreviewContainer'

type TextSectionPreviewProps = PreviewProps & TextSection

const TextSectionPreview: ComponentType<TextSectionPreviewProps> = (props) => {
  return (
    <ContentArrayPreviewContainer
      type="Text Section"
      title={props.title as string}
      body={props.body!}
      icon={<BlockContentIcon />}
    />
  )
}

export default TextSectionPreview
