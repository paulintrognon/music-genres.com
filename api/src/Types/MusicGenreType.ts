import { TrackType } from './TrackType'

export type MusicGenreType = {
  slug: string
  name: string
  tracks?: TrackType[]
}
