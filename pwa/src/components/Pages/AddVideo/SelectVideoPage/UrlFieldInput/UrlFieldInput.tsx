import { useState } from 'react'
import { parseUrl } from '../../../../../services/api/parseYoutubeUrl'
import { TrackType } from '../../../../../types/Track/TrackType'
import Loader from '../../../../Atoms/Loader/Loader'
import TextInput from '../../../../Atoms/TextInput/TextInput'
import TrackCard from '../../../GenrePage/TrackCard/TrackCard'
import classes from './UrlFieldInput.module.scss'

interface Props {
  onTrackChange: (url: string) => void
}
const UrlFieldInput: React.FC<Props> = ({ onTrackChange }) => {
  /**
   * Track state
   */
  const [isTrackLoading, setIsTrackLoading] = useState(false)
  const [trackLoadingError, setTrackLoadingError] = useState<false | string>(false)
  const [track, setTrack] = useState<TrackType>()

  /**
   * On url change, we fetch the track metadata to display the preview
   */
  const handleOnVideoLinkChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    // Youtube URL to be fetched
    const url = event.target.value

    // First, we reset state
    setTrack(undefined)
    setTrackLoadingError(false)
    onTrackChange('')

    // If URL is empty, we stop here
    if (!url) {
      return
    }

    // If url is not empty, we fetch YouTube metadata
    setIsTrackLoading(true)
    const result = await parseUrl(url)
    setIsTrackLoading(false)

    // If fetch is successful, we show the track preview and send the url up
    if (result.ok) {
      setTrack({ ...result.parsedBody, id: 0 })
      onTrackChange(url)
    }

    // If fetch unsuccessful, we signal the error
    else {
      setTrackLoadingError(result.parsedBody.message)
    }
  }

  return (
    <div className={classes.container}>
      <TextInput
        placeholder="Paste the YouTube link to your video example here"
        onChange={handleOnVideoLinkChange}
      />
      <div className={classes.preview}>
        {isTrackLoading ? <Loader /> : null}
        {trackLoadingError ? <p>{trackLoadingError}</p> : null}
        {track ? <TrackCard track={track} /> : null}
      </div>
    </div>
  )
}
export default UrlFieldInput
