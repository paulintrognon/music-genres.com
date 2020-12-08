import classnames from 'classnames'
import styles from './HashtagTitle.module.scss'

type Props = React.ComponentProps<'span'>
const HashtagTitle: React.FC<Props> = ({ className, children }) => {
  return <span className={classnames(styles.container, className)}>#&nbsp;{children}</span>
}
export default HashtagTitle
