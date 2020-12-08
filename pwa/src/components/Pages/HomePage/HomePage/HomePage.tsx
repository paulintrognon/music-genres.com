import { useState } from 'react'
import { genreLink } from '../../../../services/links/links'
import SearchGenresInput from '../../../Shared/Molecules/SearchGenresInput/SearchGenresInput/SearchGenresInput'
import GenresExamples from '../GenresExamples/GenresExamples'
import classes from './HomePage.module.scss'

const HomePage: React.FC = () => {
  /**
   * When the user focuses the search input, we hide the elements bellow.
   * On blur, we show them again.
   */
  const [bellowSearchElementsOpacity, setBellowSearchElementsOpacity] = useState(1)
  const handleOnChangeSearchFocus = (focus: boolean) => () => {
    focus ? setBellowSearchElementsOpacity(0) : setBellowSearchElementsOpacity(1)
  }

  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Discover genres by listening to what they sound</h2>
      <p className={classes.subtitle}>
        Music Genres gives you a sonore definition of musical genres by listening to YouTube videos.
      </p>
      <SearchGenresInput
        slugToHref={genreLink}
        onDirty={handleOnChangeSearchFocus(true)}
        onClean={handleOnChangeSearchFocus(false)}
      />
      <div
        data-cy="HomePage_BellowSearchElements"
        style={{ opacity: bellowSearchElementsOpacity, transition: 'opacity 200ms' }}
      >
        <GenresExamples />
      </div>
    </section>
  )
}
export default HomePage
