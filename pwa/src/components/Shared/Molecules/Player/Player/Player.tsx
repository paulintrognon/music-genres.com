import { TrackType } from '../../../../../types/Track/TrackType'
import Fader from '../../../Animations/Fader/Fader'
import CrossIcon from '../../../Atoms/Icons/CrossIcon/CrossIcon'
import classes from './Player.module.scss'

interface Props {
  track?: TrackType
  onClose: () => void
}
const Player: React.FC<Props> = ({ track, onClose }) => {
  return (
    <Fader isVisible={Boolean(track)}>
      <div className={classes.container}>
        <div>
          <div className={classes.closeContainer}>
            <button onClick={onClose} className={classes.closeIcon} aria-label="Close">
              <CrossIcon />
            </button>
          </div>
          <iframe
            width="646"
            height="405"
            frameBorder="0"
            title="Youtube Player"
            src={`https://www.youtube.com/embed/${track?.playerTrackId}?autoplay=1&start=20&origin=https://www.music-genres.com`}
          />
        </div>
      </div>
    </Fader>
  )
}
export default Player
