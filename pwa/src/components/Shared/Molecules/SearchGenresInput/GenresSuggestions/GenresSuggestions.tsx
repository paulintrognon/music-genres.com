import Link from 'next/link'
import { MusicGenreBaseType } from '../../../../../types/MusicGenre/MusicGenreBaseType'
import classnames from 'classnames'
import classes from './GenresSuggestions.module.scss'
import Loader from '../../../Atoms/Loader/Loader'

type Props = {
  isLoading: boolean
  genreName: string
  suggestions: MusicGenreBaseType[]
  slugToHref: (slug: string) => string
}
const GenresSuggestions: React.FC<Props> = ({ isLoading, genreName, suggestions, slugToHref }) => {
  if (isLoading) {
    return (
      <div className={classes.suggestion} style={{ textAlign: 'center' }}>
        <Loader />
      </div>
    )
  }
  if (suggestions.length === 0) {
    return (
      <div className={classes.suggestion}>
        &quot; <i>{genreName}</i> &quot; does not exist yet.{' '}
        <Link href={`/add/video/${genreName}`}>
          <a>Create it!</a>
        </Link>
      </div>
    )
  }
  return (
    <div>
      {suggestions.map((suggestion) => (
        <Link key={suggestion.slug} href={slugToHref(suggestion.slug)}>
          <a className={classnames(classes.suggestion, classes.hover)}>{suggestion.name}</a>
        </Link>
      ))}
    </div>
  )
}
export default GenresSuggestions
