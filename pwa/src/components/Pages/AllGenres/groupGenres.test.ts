import { MusicGenreBaseType } from '../../../types/MusicGenre/MusicGenreBaseType'
import { groupGenres } from './groupGenres'

const TwoTone = { id: 1, name: '2 Tone', slug: '' }
const aCappella = { id: 2, name: 'A Cappella', slug: '' }
const acidTechno = { id: 3, name: 'Acid Techno', slug: '' }
const ambientPop = { id: 4, name: 'Ambient Pop  ', slug: '' }
const bachata = { id: 5, name: 'Bachata', slug: '' }
const classicalMusic = { id: 6, name: 'Classical Music', slug: '' }
const cantusFirmusMass = { id: 7, name: 'Cantus Firmus Mass', slug: '' }

const genres: MusicGenreBaseType[] = [
  TwoTone,
  aCappella,
  acidTechno,
  ambientPop,
  bachata,
  classicalMusic,
  cantusFirmusMass,
]

it('should group genres', () => {
  const group = groupGenres(genres)
  expect(group).toEqual([
    {
      letter: '2',
      genres: [TwoTone],
    },
    {
      letter: 'A',
      genres: [aCappella, acidTechno, ambientPop],
    },
    {
      letter: 'B',
      genres: [bachata],
    },
    {
      letter: 'C',
      genres: [classicalMusic, cantusFirmusMass],
    },
  ])
})
