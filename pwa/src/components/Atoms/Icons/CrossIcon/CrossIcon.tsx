import React from 'react'
import CrossIconPng from './CrossIcon.png'

type Props = React.ComponentProps<'img'>
const CrossIcon: React.FC<Props> = ({ className, ...props }) => (
  <img src={CrossIconPng} alt="X" className={className} {...props} />
)
export default CrossIcon
