import React from 'react'
import createRenderer from 'react-test-renderer/shallow'
import GenresSuggestions from './GenresSuggestions'

const renderer = createRenderer.createRenderer()
const slugToHref = (slug: string): string => `/path/to/${slug}`
const genreName = 'Super Genre'
const suggestions = [
  { id: 1, name: 'Genre 1', slug: 'genre-1' },
  { id: 2, name: 'Genre 2', slug: 'genre-2' },
  { id: 3, name: 'Genre 3', slug: 'genre-3' },
]

it('should render the GenresSuggestions', () => {
  expect(
    renderer.render(
      <GenresSuggestions
        isLoading={false}
        genreName={genreName}
        suggestions={suggestions}
        slugToHref={slugToHref}
      />
    )
  ).toMatchSnapshot()
})

it('should render "loader" if loading', () => {
  expect(
    renderer.render(
      <GenresSuggestions
        isLoading={true}
        genreName={genreName}
        suggestions={suggestions}
        slugToHref={slugToHref}
      />
    )
  ).toMatchSnapshot()
})

it('should render "no result" if no suggestions', () => {
  expect(
    renderer.render(
      <GenresSuggestions
        isLoading={false}
        genreName={genreName}
        suggestions={[]}
        slugToHref={slugToHref}
      />
    )
  ).toMatchSnapshot()
})
