import classnames from 'classnames'
import Loader from '../../Loader/Loader'
import classes from './SquareButton.module.scss'

interface Props extends React.ComponentProps<'span'> {
  isLoading?: boolean
}
const SquareButton: React.FC<Props> = ({ isLoading, className, children, ...props }) => {
  return (
    <span className={classnames(classes.container, className)} {...props}>
      {isLoading ? <Loader /> : children}
    </span>
  )
}
export default SquareButton
