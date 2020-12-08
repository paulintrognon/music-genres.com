import { shallow } from 'enzyme'
import { TrackType } from '../../../../../types/Track/TrackType'
import Player from './Player'

it('should render the Player with visible = false if no track is provided', () => {
  const wrapper = shallow(<Player onClose={jest.fn()} />)
  expect(wrapper).toMatchSnapshot()
})

it('should render the Player with visible = true if track is provided', () => {
  const track: TrackType = {
    id: 1,
    title: 'Abc 123',
    playerName: 'youtube',
    playerTrackId: 'abc123',
  }
  const wrapper = shallow(<Player track={track} onClose={jest.fn()} />)
  expect(wrapper).toMatchSnapshot()
})

it('should call onClose when clicking on close icon', () => {
  const onClose = jest.fn()
  const wrapper = shallow(<Player onClose={onClose} />)
  wrapper.find('[aria-label="Close"]').simulate('click')
  expect(onClose).toHaveBeenCalledTimes(1)
})
