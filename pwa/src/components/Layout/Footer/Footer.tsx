import PlusIcon from '../../Shared/Atoms/Icons/PlusIcon/PlusIcon'
import classes from './Footer.module.scss'

const Footer: React.FunctionComponent = () => {
  return (
    <footer className={classes.container}>
      <div className={classes.content}>
        <p>
          <a href="https://fr.linkedin.com/in/margotbrun" target="_blank" rel="noreferrer">
            Design by Margot Brun
          </a>
        </p>
        <PlusIcon className={classes.plus} alt="-" />
        <p>
          <a
            href="https://github.com/paulintrognon/music-genres.com"
            target="_blank"
            rel="noreferrer"
          >
            Code
          </a>{' '}
          by{' '}
          <a href="https://paulintrognon.fr/" target="_blank" rel="noreferrer">
            Paulin Trognon
          </a>
        </p>
      </div>
    </footer>
  )
}
export default Footer
