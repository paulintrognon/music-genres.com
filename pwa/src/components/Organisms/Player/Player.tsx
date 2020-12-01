import { useDispatch, useSelector } from 'react-redux'
import { animated, useTransition } from 'react-spring'
import { close } from '../../../redux/player/player.slice'
import { RootState } from '../../../redux/store'
import CrossIcon from '../../Atoms/Icons/CrossIcon/CrossIcon'
import classes from './Player.module.scss'

const Player: React.FC = () => {
  const dispatch = useDispatch()
  const { track } = useSelector((state: RootState) => state.player)
  const transition = useTransition(track, null, {
    from: { opacity: '0' },
    enter: { opacity: '1' },
    leave: { opacity: '0' },
    config: { duration: 200 },
  })

  return (
    <>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div style={props} key={key} className={classes.container}>
              <div>
                <div className={classes.closeContainer}>
                  <button onClick={() => dispatch(close())} className={classes.closeIcon}>
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
            </animated.div>
          )
      )}
    </>
  )
}
export default Player
