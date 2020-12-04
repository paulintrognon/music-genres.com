import { YoutubeParsedTrack } from '../../types/Track/YoutubeParsedTrack'
import { HttpResponse, post } from './api'

export async function parseUrl(trackUrl: string): Promise<HttpResponse<YoutubeParsedTrack>> {
  return post<YoutubeParsedTrack>('/api/tracks/parseUrl', { trackUrl })
}
