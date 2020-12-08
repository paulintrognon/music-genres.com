import { shallow } from 'enzyme'
import { TrackType } from '../../../../types/Track/TrackType'
import TrackCard from './TrackCard'

// Mocking useDispatch
import { useDispatch } from 'react-redux'

jest.mock('react-redux')
const useDispatchMock = useDispatch as jest.Mock
const dispatchMock = jest.fn()

beforeEach(() => {
  jest.resetAllMocks()
  useDispatchMock.mockReturnValue(dispatchMock)
})

const track: TrackType = {
  id: 0,
  title: 'Super Track',
  playerName: 'youtube',
  playerTrackId: 'abcb123',
}

it('should render the TrackCard', () => {
  const wrapper = shallow(<TrackCard track={track} />)
  expect(wrapper).toMatchSnapshot()
})

it('should call the action on click', () => {
  const wrapper = shallow(<TrackCard track={track} />)
  wrapper.find('button').simulate('click')
  expect(dispatchMock.mock.calls).toEqual([
    [
      {
        payload: { track },
        type: 'player/playTrack',
      },
    ],
  ])
})
