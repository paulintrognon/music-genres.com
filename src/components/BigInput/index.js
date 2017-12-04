import React from 'react';

import './style.css';

export default function BigInput(props) {
  return (
    <input
      type="text"
      className={"big-input" + (props.isFocused ? ' focused' : '')}
      ref={props.refHandler}
      {...props}
    />
  );
}
