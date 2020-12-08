import SquareButton from './SquareButton'
import { shallow } from 'enzyme'

it('should render the SquareButton', () => {
  const wrapper = shallow(<SquareButton>Content</SquareButton>)
  expect(wrapper).toMatchSnapshot()
})

it('should render with a loader if loading', () => {
  const wrapper = shallow(<SquareButton isLoading>Content</SquareButton>)
  expect(wrapper).toMatchSnapshot()
})
