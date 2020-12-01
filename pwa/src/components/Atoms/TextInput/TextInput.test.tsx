import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import TextInput from './TextInput'

it('should render the TextInput', () => {
  expect(renderer.create(<TextInput placeholder="placeholder" />).toJSON()).toMatchSnapshot()
})

it('should call onDirty when focus, and onClean when blur', () => {
  const onDirty = jest.fn()
  const onClean = jest.fn()
  const component = mount(<TextInput onDirty={onDirty} onClean={onClean} />)

  component.find('input').simulate('focus')
  expect(onDirty).toHaveBeenCalledTimes(1)
  expect(onClean).toHaveBeenCalledTimes(0)

  component.find('input').simulate('blur')
  expect(onDirty).toHaveBeenCalledTimes(1)
  expect(onClean).toHaveBeenCalledTimes(1)
})

it('should NOT call onClean when input as value on blur', () => {
  const onClean = jest.fn()
  const component = mount(<TextInput onClean={onClean} />)

  component.find('input').simulate('focus')
  component.find('input').getDOMNode<HTMLInputElement>().value = 'new value'
  component.find('input').simulate('blur')
  expect(onClean).toHaveBeenCalledTimes(0)
})

it('should call parent onFocus & onBlur', () => {
  const onFocus = jest.fn()
  const onBlur = jest.fn()
  const component = mount(<TextInput onFocus={onFocus} onBlur={onBlur} />)
  expect(onFocus).toHaveBeenCalledTimes(0)
  expect(onBlur).toHaveBeenCalledTimes(0)

  component.find('input').simulate('focus')
  expect(onFocus).toHaveBeenCalledTimes(1)
  expect(onBlur).toHaveBeenCalledTimes(0)

  component.find('input').simulate('blur')
  expect(onFocus).toHaveBeenCalledTimes(1)
  expect(onBlur).toHaveBeenCalledTimes(1)
})

it('onDirty & onClean should still work if we provide onFocus & onBlur', () => {
  const onFocus = jest.fn()
  const onBlur = jest.fn()
  const onDirty = jest.fn()
  const onClean = jest.fn()
  const component = mount(
    <TextInput onFocus={onFocus} onBlur={onBlur} onDirty={onDirty} onClean={onClean} />
  )
  expect(onFocus).toHaveBeenCalledTimes(0)
  expect(onBlur).toHaveBeenCalledTimes(0)
  expect(onDirty).toHaveBeenCalledTimes(0)
  expect(onClean).toHaveBeenCalledTimes(0)

  component.find('input').simulate('focus')
  expect(onFocus).toHaveBeenCalledTimes(1)
  expect(onBlur).toHaveBeenCalledTimes(0)
  expect(onDirty).toHaveBeenCalledTimes(1)
  expect(onClean).toHaveBeenCalledTimes(0)

  component.find('input').simulate('blur')
  expect(onFocus).toHaveBeenCalledTimes(1)
  expect(onBlur).toHaveBeenCalledTimes(1)
  expect(onDirty).toHaveBeenCalledTimes(1)
  expect(onClean).toHaveBeenCalledTimes(1)
})
