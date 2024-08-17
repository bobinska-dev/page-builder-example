import { Flex } from '@sanity/ui'
import styled from 'styled-components'

const Pointer = styled(Flex)`
  cursor: pointer;
  #arrow {
    opacity: 0;
  }
  &:hover {
    #arrow {
      opacity: var(--card-hover-opacity, 0.5);
    }
  }
`
export default Pointer
