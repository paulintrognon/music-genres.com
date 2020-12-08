import { shallow } from 'enzyme'
import StepHeading from './StepHeading'

it('should render the StepHeading (step 1)', () => {
  const wrapper = shallow(<StepHeading step={1}>Super heading</StepHeading>)
  expect(wrapper).toMatchSnapshot()
})

it('should render the StepHeading (step 2)', () => {
  const wrapper = shallow(<StepHeading step={2}>Super heading</StepHeading>)
  expect(wrapper).toMatchSnapshot()
})
