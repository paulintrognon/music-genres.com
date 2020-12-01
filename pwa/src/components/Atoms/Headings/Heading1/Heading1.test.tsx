import React from 'react'
import renderer from 'react-test-renderer'
import Heading1 from './Heading1'

it('should render the Heading1', () => {
  expect(
    renderer.create(<Heading1 className="testClass">Super Title</Heading1>).toJSON()
  ).toMatchSnapshot()
})
