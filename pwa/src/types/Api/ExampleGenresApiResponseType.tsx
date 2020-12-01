import { ApiResultType } from './ApiResultType'
import { MusicGenreBaseType } from '../MusicGenre/MusicGenreBaseType'

export type ExampleGenresApiResponseType = ApiResultType<
  [MusicGenreBaseType, MusicGenreBaseType, MusicGenreBaseType]
>
