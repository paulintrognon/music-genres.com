import BigTitle from './BigTitle'
import { shallow } from 'enzyme'

it('should render the BigTitle', () => {
  const wrapper = shallow(<BigTitle className="testClass">Big Title</BigTitle>)
  expect(wrapper).toMatchSnapshot()
})
