import { BlockAnnotationProps, defineArrayMember, defineField, defineType } from 'sanity'
import {AsteriskIcon} from '@sanity/icons'
import styled from 'styled-components'

export default defineArrayMember({
  name: 'highlight',
  title: 'Highlight',
  type: 'object',
  icon: AsteriskIcon,
  fields: [
    defineField({
      name: 'highlightType',
      title: 'Highlight Type',
      type: 'string',
      options: {
        list: [
          {title: 'Highlight', value: 'highlight'},
          {title: 'Outline', value: 'outline'},
        ],
        layout: 'radio',
      },
      initialValue: 'highlight',
    }),
    defineField({
      name: 'highlightColor',
      title: 'Highlight Color',
      type: 'string',
      options: {
        list: ['yellow', 'purple', 'blue', 'teal', 'orange', 'gray'],
        layout: 'dropdown',
      },
      initialValue: 'yellow'
    }),
  ],
  components: {
    annotation: HighlightDecorator,
  },
})

function HighlightDecorator(props: BlockAnnotationProps) {
  return <HighlightBlock>{props.renderDefault(props)}</HighlightBlock>
}

const HighlightBlock = styled.span`
  color: #123456;
`