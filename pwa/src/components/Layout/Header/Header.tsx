import Link from 'next/link'
import classes from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={classes.container}>
      <h1 className={classes.logo}>
        <Link href="/">
          <a>
            <img src="/images/logo.png" alt="Music Genres" />
          </a>
        </Link>
      </h1>
      <div className={classes.sideButtons}>
        <Link href="/all">
          <a className={classes.sideButton}>All genres</a>
        </Link>
        <Link href="/add/video">
          <a className={classes.sideButton}>Add genre</a>
        </Link>
      </div>
    </header>
  )
}
export default Header
