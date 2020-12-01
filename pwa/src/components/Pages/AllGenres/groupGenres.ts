import { MusicGenreBaseType } from '../../../types/MusicGenre/MusicGenreBaseType'

type MusicGenreGroup = {
  letter: string
  genres: MusicGenreBaseType[]
}

type GroupedMusicGenresType = MusicGenreGroup[]

/**
 * Takes a list of alpha sorted musical genres and group them according to their first letter
 */
export function groupGenres(genres: MusicGenreBaseType[]): GroupedMusicGenresType {
  // The group to be returned
  const groupedGenres: GroupedMusicGenresType = []

  // Group being formed
  let currentGroup: MusicGenreGroup

  // For each music genre,
  genres.forEach((currentGenre) => {
    // We take the first letter of the current genre
    const firstLetter = currentGenre.name.substr(0, 1)

    // If the first letter of the current genre does NOT match the current group's letter...
    if (firstLetter !== currentGroup?.letter) {
      // We create the new group
      currentGroup = { letter: firstLetter, genres: [currentGenre] }
      // And add it to the groupedGenres result
      groupedGenres.push(currentGroup)
    }

    // If the first letter of the current genre DOES match the current group's letter...
    else {
      // ...we add the current genre to the current group
      currentGroup.genres.push(currentGenre)
    }
  })

  return groupedGenres
}
