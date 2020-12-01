import classnames from 'classnames'
import styles from './BigTitle.module.scss'

type Props = React.ComponentProps<'span'>
const BigTitle: React.FC<Props> = ({ className, children }) => {
  return <span className={classnames(styles.container, className)}>{children}</span>
}
export default BigTitle
