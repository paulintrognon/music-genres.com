import { MusicGenreBaseType } from '../../types/MusicGenre/MusicGenreBaseType'
import { HttpResponse, post } from './api'

export async function createGenre(name: string): Promise<HttpResponse<MusicGenreBaseType>> {
  return post<MusicGenreBaseType>('/api/music-genres/create', { name })
}
