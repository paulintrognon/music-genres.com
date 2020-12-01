import React from 'react'
import renderer from 'react-test-renderer'
import Footer from './Footer'

it('should render the Footer', () => {
  expect(renderer.create(<Footer />).toJSON()).toMatchSnapshot()
})
