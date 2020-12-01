import React from 'react'
import { shallow } from 'enzyme'
import { createRenderer } from 'react-test-renderer/shallow'
import InputWithIcon from './InputWithIcon'

const renderer = createRenderer()

it('should render the InputWithIcon', () => {
  const icon = <span className="the-icon" />
  expect(renderer.render(<InputWithIcon icon={icon} />)).toMatchSnapshot()
})

it('should call onSubmit on submit button clicked', () => {
  const onSubmit = jest.fn()
  const component = shallow(<InputWithIcon icon={null} onSubmit={onSubmit} />)
  component.find('form').first().simulate('submit', { preventDefault: jest.fn() })

  expect(onSubmit).toBeCalledTimes(1)
})
