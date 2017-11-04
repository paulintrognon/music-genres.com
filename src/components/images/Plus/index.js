import React from 'react';

import plusImage from './plus.png';

export default function Plus(props) {
  return (
    <img src={plusImage} alt={props.alt || 'add'} className={props.className} />
  );
}
