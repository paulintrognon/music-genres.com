import Footer from './Footer'
import { shallow } from 'enzyme'

it('should render the Footer', () => {
  const wrapper = shallow(<Footer />)
  expect(wrapper).toMatchSnapshot()
})
