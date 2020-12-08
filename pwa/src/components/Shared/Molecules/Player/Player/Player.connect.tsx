import { useDispatch, useSelector } from 'react-redux'
import { close } from '../../../../../redux/player/player.slice'
import { RootState } from '../../../../../redux/store'
import Player from './Player'

const ConnectedPlayer: React.FC = () => {
  const dispatch = useDispatch()
  const { track } = useSelector((state: RootState) => state.player)

  const handleOnClose = (): void => {
    dispatch(close())
  }

  return <Player track={track} onClose={handleOnClose} />
}
export default ConnectedPlayer
