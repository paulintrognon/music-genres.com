import { shallow } from 'enzyme'
import SelectGenrePage from './SelectGenrePage'

// Mocking userRouter
import { useRouter } from 'next/router'
import SearchGenresInput from '../../../Shared/Molecules/SearchGenresInput/SearchGenresInput/SearchGenresInput'
import SquareButton from '../../../Shared/Atoms/Buttons/SquareButton/SquareButton'
jest.mock('next/router')
const useRouterMock = useRouter as jest.Mock
const routerPushMock = jest.fn()

beforeEach(() => {
  jest.resetAllMocks()
  useRouterMock.mockReturnValue({ push: routerPushMock })
})

it('should render SelectGenrePage', () => {
  const wrapper = shallow(<SelectGenrePage />)
  expect(wrapper).toMatchSnapshot()
})

it('should display genre link on genre typed', () => {
  const wrapper = shallow(<SelectGenrePage />)
  expect(wrapper.find(SquareButton)).toHaveLength(0)

  // On query "test genre" typed ...
  wrapper.find(SearchGenresInput).simulate('change', 'test genre')

  // We expect the button containing the genre to appear
  expect(wrapper.find(SquareButton)).toHaveLength(1)
  expect(wrapper).toMatchSnapshot()
})

it('should go to next page on submit', () => {
  const wrapper = shallow(<SelectGenrePage />)

  // On query "test genre" typed ...
  wrapper.find(SearchGenresInput).simulate('change', 'test genre')
  wrapper.find(SearchGenresInput).simulate('submit')

  // The router must push to the add video page with the typed genre
  expect(routerPushMock.mock.calls).toEqual([['/add/video/test genre']])
})
