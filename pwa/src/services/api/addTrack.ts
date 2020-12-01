import { MusicGenreBaseType } from '../../types/MusicGenre/MusicGenreBaseType'
import { TrackType } from '../../types/Track/TrackType'
import { HttpResponse, post } from './api'

export type ApiAddTrackSuccessType = {
  track: TrackType
  musicGenre: MusicGenreBaseType
}

export async function addTrack(
  url: string,
  musicGenreId: number
): Promise<HttpResponse<ApiAddTrackSuccessType>> {
  return post<ApiAddTrackSuccessType>('/api/tracks/add', {
    url,
    musicGenreId,
  })
}
