import { Stack, Text } from '@sanity/ui'
import { toPlainText } from 'next-sanity'
import { PortableTextInputProps, StringInputProps } from 'sanity'
import styled from 'styled-components'

export function CharacterCountInput(props: StringInputProps) {
  // check if validations exist
  // @ts-ignore
  const validationRules = props.schemaType.validation[0]._rules || []

  //check if max Character validation exists and get the value
  const max = validationRules
    .filter((rule) => rule.flag === 'max')
    .map((rule) => rule.constraint)[0]
  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      <Text muted align={'right'} size={1}>
        Characters: {props.value?.length || 0}
        {max ? ` / ${max}` : ''}
      </Text>
    </Stack>
  )
}
export function CharacterCountInputPTEreducedHeight(
  props: PortableTextInputProps,
) {
  // check if validations exist
  // @ts-ignore
  const validationRules = props.schemaType.validation[0]._rules || []
  const characters = props.value ? toPlainText(props.value).length : 0

  //check if max Character validation exists and get the value
  const max = validationRules
    .filter((rule) => rule.flag === 'max')
    .map((rule) => rule.constraint)[0]
  return (
    <Stack space={3}>
      <Container id={'PTE-height-container'}>
        {props.renderDefault({
          ...props,
          // hideToolbar: true,
          initialActive: true,
        })}
      </Container>
      <Text muted align={'right'} size={1}>
        Characters: {characters}
        {max ? ` / ${max}` : ''}
      </Text>
    </Stack>
  )
}
export function CharacterCountInputPTE(props: PortableTextInputProps) {
  // check if validations exist
  // @ts-ignore
  const validationRules = props.schemaType.validation[0]._rules || []
  const characters = props.value ? toPlainText(props.value).length : 0

  //check if max Character validation exists and get the value
  const max = validationRules
    .filter((rule) => rule.flag === 'max')
    .map((rule) => rule.constraint)[0]
  return (
    <Stack space={3}>
      {props.renderDefault({
        ...props,
        // hideToolbar: true,
        initialActive: true,
      })}
      <Text muted align={'right'} size={1}>
        Characters: {characters}
        {max ? ` / ${max}` : ''}
      </Text>
    </Stack>
  )
}
const Container = styled.div`
  [data-testid='pt-editor'][data-fullscreen='false'] {
    height: 120px;
  }
  // removes the fullscreen button from the PTE
  [aria-label='Expand editor'] {
    display: none;
  }
`
