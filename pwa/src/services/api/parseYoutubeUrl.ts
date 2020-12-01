import { YoutubeParsedTrack } from '../../types/Track/YoutubeParsedTrack'
import { HttpResponse, post } from './api'

export async function parseUrl(url: string): Promise<HttpResponse<YoutubeParsedTrack>> {
  return post<YoutubeParsedTrack>('/api/tracks/parseUrl', { trackUrl: url })
}
