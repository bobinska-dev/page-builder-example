import { IconType } from 'react-icons/lib'
import styled from 'styled-components'

const MediaIcon = (icon: IconType | any) => (
  <IconContainer>
    {icon}
    <span id={'icon-type'} />
  </IconContainer>
)
const IconContainer = styled.div`
  position: relative;
  width: 2.0625rem;
  height: 2.0625rem;
  min-width: 2.0625rem;
  padding: 6px;
  border-radius: 0.0625rem;
  display: flex;
  overflow: hidden;
  overflow: clip;
  align-items: center;
  justify-content: center;

  svg {
    display: block;
    font-size: calc(21 / 16 * 2em);
    color: var(--card-icon-color);
    flex: 1;
    vertical-align: middle;
  }
  span {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 0 1px var(--card-fg-color);
    opacity: 0.1;
    border-radius: inherit;
    pointer-events: none;
  }
`
export default MediaIcon
