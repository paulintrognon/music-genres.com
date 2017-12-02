import React from 'react';

import './style.css';

export default function BackgroundTitle(props) {
  let className = 'background-title ';

  if (props.className) {
    className = className + props.className;
  }

  return (
    <p className={className}>
      {props.children}
    </p>
  );
}
