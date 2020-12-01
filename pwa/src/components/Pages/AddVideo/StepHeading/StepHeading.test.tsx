import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import StepHeading from './StepHeading'

const renderer = createRenderer()

it('should render the StepHeading (step 1)', () => {
  expect(renderer.render(<StepHeading step={1}>Super heading</StepHeading>)).toMatchSnapshot()
})

it('should render the StepHeading (step 2)', () => {
  expect(renderer.render(<StepHeading step={2}>Super heading</StepHeading>)).toMatchSnapshot()
})
