import Link from 'next/link'
import { animated, useTrail } from 'react-spring'
import { genreLink } from '../../../services/links/links'
import { MusicGenreBaseType } from '../../../types/MusicGenre/MusicGenreBaseType'
import BigTitle from '../../Atoms/Titles/BigTitle/BigTitle'
import HashtagTitle from '../../Atoms/Titles/HashtagTitle/HashtagTitle'
import classes from './AllGenres.module.scss'
import { groupGenres } from './groupGenres'

interface Props {
  genres: MusicGenreBaseType[]
}
const AllGenres: React.FC<Props> = ({ genres }) => {
  const groupedGenres = groupGenres(genres)

  const trail = useTrail(groupedGenres.length, {
    from: { opacity: '0' },
    to: { opacity: '1' },
  })

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>
        <BigTitle>List of all musical genres and styles</BigTitle>
      </h2>
      {trail.map((props, index) => (
        <animated.div key={index} className={classes.group} style={props}>
          <h3 className={classes.groupTitle}>
            <HashtagTitle>{groupedGenres[index].letter}</HashtagTitle>
          </h3>
          <div className="row">
            {groupedGenres[index].genres.map((genre) => (
              <p key={genre.slug} className="col-xs-12 col-sm-6 col-md-4">
                <Link href={genreLink(genre.slug)}>
                  <a className={classes.link}>{genre.name}</a>
                </Link>
              </p>
            ))}
          </div>
        </animated.div>
      ))}
    </div>
  )
}
export default AllGenres
