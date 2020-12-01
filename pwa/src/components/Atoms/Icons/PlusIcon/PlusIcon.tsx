import React from 'react'
import PlusPng from './plus.png'

type Props = React.ComponentProps<'img'>
const PlusIcon: React.FC<Props> = ({ className, ...props }) => (
  <img src={PlusPng} alt="plus" className={className} {...props} />
)
export default PlusIcon
