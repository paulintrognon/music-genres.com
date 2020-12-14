import { MusicGenreType } from 'Types/MusicGenreType'
import knex from '../db'

export async function getFromSlug(slug: string): Promise<MusicGenreType | undefined> {
  const genre = await knex<MusicGenreType>('MusicGenres')
    .where('slug', slug)
    .leftJoin('MusicGenreTracks', 'MusicGenres.id', 'MusicGenreTracks.musicGenreId')
    .first()
  return genre
}
