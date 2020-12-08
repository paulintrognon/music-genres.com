import classnames from 'classnames'
import { useRef, useState } from 'react'
import styles from './TextInput.module.scss'

export interface Props extends React.ComponentProps<'input'> {
  /**
   * Called on focus or if text is entered
   */
  onDirty?: () => void

  /**
   * Called on blur *only if input value is empty*
   */
  onClean?: () => void
}
const TextInput: React.FC<Props> = ({ className, onDirty, onClean, onFocus, onBlur, ...props }) => {
  const ref = useRef<HTMLInputElement>(null)

  const [isFocused, setIsFocused] = useState(false)

  /**
   * On Focus, we update the isFocused state, and we call onDirty
   */
  const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    setIsFocused(true)
    onDirty && onDirty()
    onFocus && onFocus(event)
  }

  /**
   * On Blur, we update the isFocused state, and *if the input is empty*, we call onClean
   */
  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    setIsFocused(false)
    // onClean is called only when blurring from an empty input
    if (onClean && !ref.current?.value) {
      onClean()
    }
    onBlur && onBlur(event)
  }

  /**
   * The input is dirty if focus, or if its value is non-empty.
   */
  const isDirty = isFocused || ref.current?.value

  return (
    <input
      type="text"
      ref={ref}
      className={classnames(className, styles.input, { [styles.dirty]: isDirty })}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      {...props}
    />
  )
}
export default TextInput
