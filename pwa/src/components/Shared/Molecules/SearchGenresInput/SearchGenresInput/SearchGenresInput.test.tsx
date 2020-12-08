import { shallow } from 'enzyme'
import SearchGenresInput from './SearchGenresInput'
import InputWithIcon from '../../InputWithIcon/InputWithIcon'
import GenresSuggestions from '../GenresSuggestions/GenresSuggestions'

// Mocking useSWR
import useSWR from 'swr'
jest.mock('swr')
const useSWRMock = useSWR as jest.Mock

const slugToHref = (slug: string): string => `/path/to/${slug}`

beforeEach(() => {
  jest.resetAllMocks()
  useSWRMock.mockReturnValue({ data: { result: [] } })
})

it('should render SearchGenres', () => {
  const wrapper = shallow(<SearchGenresInput slugToHref={slugToHref} />)
  expect(wrapper).toMatchSnapshot()
})

it('should search genres on input', async () => {
  const onDirty = jest.fn()
  const onClean = jest.fn()

  const wrapper = shallow(
    <SearchGenresInput onDirty={onDirty} onClean={onClean} slugToHref={slugToHref} />
  )

  // On component mount, useSWR should be called with an empty string
  expect(useSWRMock).toHaveBeenCalledTimes(1)
  expect(useSWRMock.mock.calls[0]).toEqual([''])
  expect(wrapper.find(GenresSuggestions)).toHaveLength(0)

  // On query "test" typed ...
  const suggestionsResult = [{ name: 'Genre', slug: 'genre' }]
  useSWRMock.mockReturnValueOnce({ data: { result: suggestionsResult } })
  wrapper.find(InputWithIcon).simulate('change', {
    target: { value: 'test' },
  })
  // ...useSWR should be called with corresponding API url
  expect(useSWRMock).toHaveBeenCalledTimes(2)
  expect(useSWRMock.mock.calls[1]).toEqual(['/api/music-genres/search?query=test&limit=5'])
  // ...and suggestions should be shown
  expect(wrapper).toMatchSnapshot()
})

it('should call onSubmit with typed text on submit', async () => {
  const onSubmit = jest.fn()

  const wrapper = shallow(<SearchGenresInput onSubmit={onSubmit} slugToHref={slugToHref} />)

  // On query "BardCore" typed ...
  wrapper.find(InputWithIcon).simulate('change', {
    target: { value: 'BardCore' },
  })

  // And on submit...
  wrapper.find(InputWithIcon).simulate('submit')

  // onSubmit should be called with "BardCode"
  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit.mock.calls[0]).toEqual(['BardCore'])
})
