import { Stack, Text } from '@sanity/ui'
import { PortableTextInputProps, StringInputProps } from 'sanity'

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
export function CharacterCountInputPTE(props: PortableTextInputProps) {
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
