import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
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
  const renderer = createRenderer()
  expect(renderer.render(<TrackCard track={track} />)).toMatchSnapshot()
})

it('should call the action on click', () => {
  const component = shallow(<TrackCard track={track} />)
  component.find('button').simulate('click')
  expect(dispatchMock.mock.calls).toEqual([
    [
      {
        payload: { track },
        type: 'player/playTrack',
      },
    ],
  ])
})
