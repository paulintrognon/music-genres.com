import React from 'react'
import renderer from 'react-test-renderer'
import Header from './Header'

it('should render the Header', () => {
  expect(renderer.create(<Header />).toJSON()).toMatchSnapshot()
})
