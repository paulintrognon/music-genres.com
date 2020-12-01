import Link from 'next/link'
import useSWR from 'swr'
import { ExampleGenresApiResponseType } from '../../../../types/Api/ExampleGenresApiResponseType'
import Loader from '../../../Atoms/Loader/Loader'
import classes from './GenresExamples.module.scss'

const GenresExamples: React.FC = () => {
  /**
   * On query state changes, we fetch 3 genres examples
   */
  const { isValidating, data } = useSWR<ExampleGenresApiResponseType>('/api/music-genres/random')
  if (!data) {
    return null
  }

  return (
    <div className={classes.container}>
      Examples:
      {isValidating ? (
        <>
          <a className={classes.example}>
            <Loader />
          </a>
          <a className={classes.example}>
            <Loader />
          </a>
          <a className={classes.example}>
            <Loader />
          </a>
        </>
      ) : (
        data.result.map((genre) => (
          <Link key={genre.slug} href={`/genre/${genre.slug}`}>
            <a className={classes.example}>{genre.name}</a>
          </Link>
        ))
      )}
    </div>
  )
}
export default GenresExamples
