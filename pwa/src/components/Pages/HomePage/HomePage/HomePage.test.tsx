import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import { shallow } from 'enzyme'
import HomePage from './HomePage'
import SearchGenres from '../../../Organisms/SearchGenres/SearchGenres/SearchGenres'

it('should render the HomePage', () => {
  const renderer = createRenderer()
  expect(renderer.render(<HomePage />)).toMatchSnapshot()
})

it('should change the opacity of components bellow search input', () => {
  const component = shallow(<HomePage />)

  // Initially opacity should be 1
  expect(component.find('[data-cy="HomePage_BellowSearchElements"]').props().style).toHaveProperty(
    'opacity',
    1
  )

  // On search focus, opacity should be 0
  ;(component.find(SearchGenres).props().onDirty as () => void)()
  expect(component.find('[data-cy="HomePage_BellowSearchElements"]').props().style).toHaveProperty(
    'opacity',
    0
  )

  // On search blur, opacity should go back to 1
  ;(component.find(SearchGenres).props().onClean as () => void)()
  expect(component.find('[data-cy="HomePage_BellowSearchElements"]').props().style).toHaveProperty(
    'opacity',
    1
  )
})
