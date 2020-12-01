import { useDispatch } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { close } from '../../../../redux/player/player.slice'
import classes from './YoutubePlayer.module.scss'

interface Props {
  trackId: string
}
const YoutubePlayer: React.FC<Props> = ({ trackId }) => {
  const dispatch = useDispatch()
  const props = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } })

  return (
    <animated.div style={props} className={classes.container}>
      <div>
        <button onClick={() => dispatch(close())}>Close</button>

        <iframe
          width="646"
          height="405"
          frameBorder="0"
          title="Youtube Player"
          src={`https://www.youtube.com/embed/${trackId}?autoplay=1&origin=https://www.music-genres.com`}
        />
      </div>
    </animated.div>
  )
}
export default YoutubePlayer
