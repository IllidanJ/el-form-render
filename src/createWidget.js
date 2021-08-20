import { defaultGetValueFromEvent } from './utils'
export const transformProps = props => {
  const {
    onChange,
    value,
    defaultValue,
    schema: ownSchema,
    readOnly,
    ...rest
  } = props
  const schema = { ...ownSchema }
  const { trigger, valuePropName } = schema || {}
  const controlProps = {}
  let _valuePropName = 'value'
  const _value = value === undefined ? defaultValue : value
  if (valuePropName && typeof valuePropName === 'string') {
    _valuePropName = valuePropName
    controlProps[valuePropName] = _value
  } else {
    controlProps.value = _value
  }
  const _onChange = (...args) => {
    const newValue = defaultGetValueFromEvent(_valuePropName, ...args)
    onChange(newValue)
  }
  if (trigger && typeof trigger === 'string') {
    controlProps[trigger] = _onChange
  } else {
    controlProps.onChange = _onChange
  }

  // TODO: 之后 ui:xx 会舍去
  const usefulPropsFromSchema = {
    disabled: schema.disabled || schema['ui:disabled'],
    readOnly: schema.readOnly || schema['ui:readonly'] || readOnly,
    hidden: schema.hidden || schema['ui:hidden']
  }

  const _props = {
    ...controlProps,
    schema,
    ...usefulPropsFromSchema,
    ...rest
  }

  return _props
}
