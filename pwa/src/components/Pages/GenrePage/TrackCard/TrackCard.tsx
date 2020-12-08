import { useDispatch } from 'react-redux'
import { playTrack } from '../../../../redux/player/player.slice'
import { TrackType } from '../../../../types/Track/TrackType'
import PlayIcon from '../../../Shared/Atoms/Icons/PlayIcon/PlayIcon'
import classes from './TrackCard.module.scss'

interface Props {
  track: TrackType
}
const TrackCard: React.FC<Props> = ({ track }) => {
  const dispatch = useDispatch()

  const handleOnClick = (): void => {
    dispatch(playTrack({ track }))
  }

  return (
    <button type="button" title={track.title} className={classes.container} onClick={handleOnClick}>
      <div
        className={classes.play}
        style={{
          backgroundImage: `url("https://img.youtube.com/vi/${track.playerTrackId}/hqdefault.jpg")`,
        }}
      >
        <div className={classes.playIconContainer}>
          <PlayIcon />
        </div>
      </div>
    </button>
  )
}
export default TrackCard
