import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import SquareButton from './SquareButton'

const renderer = createRenderer()

it('should render the SquareButton', () => {
  expect(renderer.render(<SquareButton>Content</SquareButton>)).toMatchSnapshot()
})

it('should render with a loader if loading', () => {
  expect(renderer.render(<SquareButton isLoading>Content</SquareButton>)).toMatchSnapshot()
})
