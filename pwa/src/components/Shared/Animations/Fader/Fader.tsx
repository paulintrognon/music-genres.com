import { animated, useTransition } from 'react-spring'

interface Props {
  isVisible: boolean
}
const Fader: React.FC<Props> = ({ isVisible, children }) => {
  const transition = useTransition(Boolean(isVisible), null, {
    from: { opacity: '0' },
    enter: { opacity: '1' },
    leave: { opacity: '0' },
    config: { duration: 200 },
  })

  return (
    <>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div style={props} key={key}>
              {children}
            </animated.div>
          )
      )}
    </>
  )
}
export default Fader
