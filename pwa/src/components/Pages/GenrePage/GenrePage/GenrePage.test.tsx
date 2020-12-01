import React from 'react'
import createRenderer from 'react-test-renderer/shallow'
import { MusicGenreDetailsType } from '../../../../types/MusicGenre/MusicGenreDetailsType'
import GenrePage from './GenrePage'

it('should render the GenrePage', () => {
  const renderer = createRenderer.createRenderer()
  const genre: MusicGenreDetailsType = {
    id: 1,
    name: 'Super Genre',
    slug: 'super-genre',
    tracks: [{ id: 1, title: 'Super Title', playerTrackId: 'abc123', playerName: 'youtube' }],
  }
  expect(renderer.render(<GenrePage genre={genre} />)).toMatchSnapshot()
})
