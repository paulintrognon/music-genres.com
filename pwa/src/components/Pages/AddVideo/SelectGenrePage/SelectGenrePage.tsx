import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { addVideoLink } from '../../../../services/links/links'
import SquareButton from '../../../Atoms/Buttons/SquareButton/SquareButton'
import SearchGenres from '../../../Organisms/SearchGenres/SearchGenres/SearchGenres'
import StepHeading from '../StepHeading/StepHeading'
import classes from './SelectGenrePage.module.scss'

const SelectGenrePage: React.FC = () => {
  const router = useRouter()

  /**
   * Genre Name searched state
   */
  const [genreName, setGenreName] = useState<string>()
  const handleGenreChange = (genre: string): void => {
    setGenreName(genre)
  }

  /**
   * On submit, if a genreName has been entered, we go to next page
   */
  const handleGenreSubmit = (): void => {
    if (genreName) {
      router.push(addVideoLink(genreName))
    }
  }

  return (
    <div className={classes.container}>
      {/* heading */}
      <StepHeading step={1}>Select a genre related to your video</StepHeading>

      {/* Search Genre input bar */}
      <SearchGenres
        slugToHref={addVideoLink}
        onChange={handleGenreChange}
        onSubmit={handleGenreSubmit}
      />

      {/* Submit button (displayed only if genre has been entered) */}
      {genreName ? (
        <div className={classes.addGenreContainer}>
          <Link href={addVideoLink(genreName)}>
            <a>
              <SquareButton>Create &quot;{genreName}&quot;</SquareButton>
            </a>
          </Link>
        </div>
      ) : null}
    </div>
  )
}

export default SelectGenrePage
