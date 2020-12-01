import classnames from 'classnames'
import classes from './StepHeading.module.scss'

interface Props {
  step: 1 | 2
}
const StepHeading: React.FC<Props> = ({ step, children }) => {
  const stepWord = step === 1 ? 'one' : 'two'
  return (
    <div className={classes.container}>
      <div className={classnames(classes.backgroundText, classes[stepWord])}>Step {stepWord}</div>
      <div className={classes.stepText}>{step}/2</div>
      <h2 className={classes.foregroundText}>{children}</h2>
    </div>
  )
}
export default StepHeading
