import { shallow } from 'enzyme'
import GenresSuggestions from './GenresSuggestions'

const slugToHref = (slug: string): string => `/path/to/${slug}`
const genreName = 'Super Genre'
const suggestions = [
  { id: 1, name: 'Genre 1', slug: 'genre-1' },
  { id: 2, name: 'Genre 2', slug: 'genre-2' },
  { id: 3, name: 'Genre 3', slug: 'genre-3' },
]

it('should render the GenresSuggestions', () => {
  const wrapper = shallow(
    <GenresSuggestions
      isLoading={false}
      genreName={genreName}
      suggestions={suggestions}
      slugToHref={slugToHref}
    />
  )
  expect(wrapper).toMatchSnapshot()
})

it('should render "loader" if loading', () => {
  const wrapper = shallow(
    <GenresSuggestions
      isLoading={true}
      genreName={genreName}
      suggestions={suggestions}
      slugToHref={slugToHref}
    />
  )
  expect(wrapper).toMatchSnapshot()
})

it('should render "no result" if no suggestions', () => {
  const wrapper = shallow(
    <GenresSuggestions
      isLoading={false}
      genreName={genreName}
      suggestions={[]}
      slugToHref={slugToHref}
    />
  )
  expect(wrapper).toMatchSnapshot()
})
