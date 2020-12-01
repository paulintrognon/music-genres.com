import { ApiResultType } from './ApiResultType'
import { MusicGenreBaseType } from '../MusicGenre/MusicGenreBaseType'

export type GenreSuggestionsApiResultType = ApiResultType<MusicGenreBaseType[]>
