import React from 'react';

import './style.css';

export default function BigInput(props) {
  const { isFocused, refHandler, ...other } = props;
  return (
    <input
      type="text"
      className={"big-input" + (isFocused ? ' focused' : '')}
      ref={refHandler}
      {...other}
    />
  );
}
