import React from 'react'
import createRenderer from 'react-test-renderer/shallow'
import { shallow } from 'enzyme'
import SelectGenrePage from './SelectGenrePage'

// Mocking userRouter
import { useRouter } from 'next/router'
import SearchGenres from '../../../Organisms/SearchGenres/SearchGenres/SearchGenres'
import SquareButton from '../../../Atoms/Buttons/SquareButton/SquareButton'
jest.mock('next/router')
const useRouterMock = useRouter as jest.Mock
const routerPushMock = jest.fn()

const renderer = createRenderer.createRenderer()

beforeEach(() => {
  jest.resetAllMocks()
  useRouterMock.mockReturnValue({ push: routerPushMock })
})

it('should render SelectGenrePage', () => {
  expect(renderer.render(<SelectGenrePage />)).toMatchSnapshot()
})

it('should display genre link on genre typed', () => {
  const component = shallow(<SelectGenrePage />)
  expect(component.find(SquareButton)).toHaveLength(0)

  // On query "test genre" typed ...
  component.find(SearchGenres).simulate('change', 'test genre')

  // We expect the button containing the genre to appear
  expect(component.find(SquareButton)).toHaveLength(1)
  expect(component.find(SquareButton).dive().text()).toEqual('Create "test genre"')
})

it('should go to next page on submit', () => {
  const component = shallow(<SelectGenrePage />)

  // On query "test genre" typed ...
  component.find(SearchGenres).simulate('change', 'test genre')
  component.find(SearchGenres).simulate('submit')

  // The router must push to the add video page with the typed genre
  expect(routerPushMock.mock.calls).toEqual([['/add/video/test genre']])
})
