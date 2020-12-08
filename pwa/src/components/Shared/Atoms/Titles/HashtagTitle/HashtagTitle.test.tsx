import HashtagTitle from './HashtagTitle'
import { shallow } from 'enzyme'

it('should render the HashtagTitle', () => {
  const wrapper = shallow(<HashtagTitle className="testClass">Super Title</HashtagTitle>)
  expect(wrapper).toMatchSnapshot()
})
