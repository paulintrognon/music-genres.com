import InputWithIcon from './InputWithIcon'
import { shallow } from 'enzyme'

it('should render the InputWithIcon', () => {
  const wrapper = shallow(<InputWithIcon icon={<span className="the-icon" />} />)
  expect(wrapper).toMatchSnapshot()
})

it('should call onSubmit on form submit', () => {
  const onSubmit = jest.fn()
  const wrapper = shallow(<InputWithIcon icon={null} onSubmit={onSubmit} />)
  wrapper.find('form').first().simulate('submit', { preventDefault: jest.fn() })

  expect(onSubmit).toBeCalledTimes(1)
})
