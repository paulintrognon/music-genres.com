import { shallow } from 'enzyme'
import Fader from './Fader'

it('should return nothing if visible is false', () => {
  const wrapper = shallow(
    <Fader isVisible={false}>
      <p>Children</p>
    </Fader>
  )
  expect(wrapper).toMatchSnapshot()
})
