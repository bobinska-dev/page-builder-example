import { ComponentType } from 'react'
import { BlockDecoratorProps } from 'sanity'


export const BiggerSizeDecorator:ComponentType<BlockDecoratorProps> = (props) => {

  return <span style={{ fontSize: '1.25em' }}>{props.children}</span>
}