import React from 'react'
import renderer from 'react-test-renderer'
import HashtagTitle from './HashtagTitle'

it('should render the HashtagTitle', () => {
  expect(
    renderer.create(<HashtagTitle className="testClass">Super Title</HashtagTitle>).toJSON()
  ).toMatchSnapshot()
})
