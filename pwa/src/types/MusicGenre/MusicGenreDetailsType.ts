import { TrackType } from '../Track/TrackType'
import { MusicGenreBaseType } from './MusicGenreBaseType'

export type MusicGenreDetailsType = MusicGenreBaseType & {
  tracks: TrackType[]
}
