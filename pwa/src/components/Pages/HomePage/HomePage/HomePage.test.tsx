import { shallow } from 'enzyme'
import HomePage from './HomePage'
import SearchGenresInput from '../../../Shared/Molecules/SearchGenresInput/SearchGenresInput/SearchGenresInput'

it('should render the HomePage', () => {
  const wrapper = shallow(<HomePage />)
  expect(wrapper).toMatchSnapshot()
})

it('should change the opacity of components bellow search input', () => {
  const wrapper = shallow(<HomePage />)

  // Initially opacity should be 1
  expect(wrapper.find('[data-cy="HomePage_BellowSearchElements"]').props().style).toHaveProperty(
    'opacity',
    1
  )

  // On search focus, opacity should be 0
  ;(wrapper.find(SearchGenresInput).props().onDirty as () => void)()
  expect(wrapper.find('[data-cy="HomePage_BellowSearchElements"]').props().style).toHaveProperty(
    'opacity',
    0
  )

  // On search blur, opacity should go back to 1
  ;(wrapper.find(SearchGenresInput).props().onClean as () => void)()
  expect(wrapper.find('[data-cy="HomePage_BellowSearchElements"]').props().style).toHaveProperty(
    'opacity',
    1
  )
})
