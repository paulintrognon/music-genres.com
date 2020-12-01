import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TrackType } from '../../types/Track/TrackType'

type PlayerState = {
  isOpen: boolean
  track?: TrackType
}

const initialState: PlayerState = {
  isOpen: false,
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playTrack: (state, action: PayloadAction<{ track: TrackType }>) => ({
      isOpen: true,
      track: action.payload.track,
    }),
    close: () => ({
      isOpen: false,
    }),
  },
})

export const { playTrack, close } = playerSlice.actions

export default playerSlice.reducer
