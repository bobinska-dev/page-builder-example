
import {ComponentType} from 'react'
import {BlockDecoratorProps} from 'sanity'
import styled from 'styled-components'

const HighlightedSpan = styled.span`
  background-color: rgba(251, 238, 2, 0.37);
`

export const Highlighter: ComponentType<BlockDecoratorProps> = (props) => {
  return <HighlightedSpan>{props.children}</HighlightedSpan>
}
