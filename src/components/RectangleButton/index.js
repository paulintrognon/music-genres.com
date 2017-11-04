import React from 'react';

import './style.css';

export default function RectangleButton(props) {
  return (
    <button className="rectangle-button">
      {props.children}
    </button>
  );
}
