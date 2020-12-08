import GenresExamples from './GenresExamples'

// Mocking getPost
import useSWR from 'swr'
import { shallow } from 'enzyme'
jest.mock('swr')
const useSWRMock = useSWR as jest.Mock

beforeEach(() => {
  jest.resetAllMocks()
})

it('should render examples after fetch', async () => {
  const examplesResult = [
    { name: 'Genre 1', slug: 'genre-1' },
    { name: 'Genre 2', slug: 'genre-2' },
    { name: 'Genre 3', slug: 'genre-3' },
  ]
  useSWRMock.mockReturnValueOnce({ data: { result: examplesResult } })
  const wrapper = shallow(<GenresExamples />)
  expect(wrapper).toMatchSnapshot()

  expect(useSWRMock).toHaveBeenCalledTimes(1)
  expect(useSWRMock.mock.calls[0]).toEqual(['/api/music-genres/random'])
})

it('should render with loaders if loading', async () => {
  useSWRMock.mockReturnValueOnce({ isValidating: true, data: {} })
  const wrapper = shallow(<GenresExamples />)
  expect(wrapper).toMatchSnapshot()
})

it('should return null if no data', async () => {
  useSWRMock.mockReturnValueOnce({ data: null })
  const wrapper = shallow(<GenresExamples />)
  expect(wrapper).toMatchSnapshot()
})
