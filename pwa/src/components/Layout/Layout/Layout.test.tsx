import { Layout } from './Layout'
import { shallow } from 'enzyme'

it('should render Layout', () => {
  const wrapper = shallow(<Layout>Hello world</Layout>)
  expect(wrapper).toMatchSnapshot()
})
