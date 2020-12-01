import classnames from 'classnames'
import styles from './Heading1.module.scss'

type Props = React.ComponentProps<'span'>
const Heading1: React.FC<Props> = ({ className, children }) => {
  return <span className={classnames(styles.container, className)}>{children}</span>
}
export default Heading1
