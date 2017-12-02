import React from 'react';

import './style.css';

export default function RectangleButton(props) {
  let className = 'rectangle-button ';

  if (props.className) {
    className += props.className;
  }

  return (
    <button className={className} onClick={props.onClick} style={props.style}>
      {props.children}
    </button>
  );
}
