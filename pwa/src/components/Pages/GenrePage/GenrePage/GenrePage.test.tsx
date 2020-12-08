import { shallow } from 'enzyme'
import { MusicGenreDetailsType } from '../../../../types/MusicGenre/MusicGenreDetailsType'
import GenrePage from './GenrePage'

it('should render the GenrePage', () => {
  const genre: MusicGenreDetailsType = {
    id: 1,
    name: 'Super Genre',
    slug: 'super-genre',
    tracks: [{ id: 1, title: 'Super Title', playerTrackId: 'abc123', playerName: 'youtube' }],
  }
  const wrapper = shallow(<GenrePage genre={genre} />)
  expect(wrapper).toMatchSnapshot()
})
