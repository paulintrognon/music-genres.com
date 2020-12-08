import Header from './Header'
import { shallow } from 'enzyme'

it('should render the Header', () => {
  const wrapper = shallow(<Header />)
  expect(wrapper).toMatchSnapshot()
})
