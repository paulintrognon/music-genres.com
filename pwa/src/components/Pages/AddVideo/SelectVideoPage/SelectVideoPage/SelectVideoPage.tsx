import { useState } from 'react'
import { MusicGenreBaseType } from '../../../../../types/MusicGenre/MusicGenreBaseType'
import StepHeading from '../../StepHeading/StepHeading'
import AddTrack from '../AddTrack/AddTrack'
import UrlFieldInput from '../UrlFieldInput/UrlFieldInput'
import classes from './SelectVideoPage.module.scss'

interface Props {
  genre?: MusicGenreBaseType
  genreName?: string
}
const SelectVideoPage: React.FC<Props> = ({ genre, genreName }) => {
  /**
   * YouTube video url to add state
   */
  const [url, setUrl] = useState('')
  const handleTrackChange = (url: string): void => {
    setUrl(url)
  }

  return (
    <div className={classes.container}>
      {/* Heading */}
      <StepHeading step={2}>
        Add a <span className={classes.genreName}>{genre?.name || genreName}</span> video
      </StepHeading>

      {/* Url Input + preview */}
      <UrlFieldInput onTrackChange={handleTrackChange} />

      {/* Add track button */}
      {url ? <AddTrack url={url} genre={genre} genreName={genreName} /> : null}
    </div>
  )
}
export default SelectVideoPage
