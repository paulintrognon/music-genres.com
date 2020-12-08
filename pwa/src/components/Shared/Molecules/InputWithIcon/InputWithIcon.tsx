import TextInput, { Props as TextInputProps } from '../../Atoms/TextInput/TextInput'
import classnames from 'classnames'
import classes from './InputWithIcon.module.scss'

interface Props extends TextInputProps {
  icon: React.ReactNode
  onSubmit?: () => void
}
const InputWithIcon: React.FC<Props> = ({ icon, className, onSubmit, ...props }) => {
  const handleOnSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    onSubmit && onSubmit()
  }

  return (
    <form className={classnames(classes.container, className)} onSubmit={handleOnSubmit}>
      <TextInput {...props} />
      <button type="submit" className={classes.icon}>
        {icon}
      </button>
    </form>
  )
}
export default InputWithIcon
