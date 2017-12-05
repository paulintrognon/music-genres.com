import React from 'react';

import './style.css';

export default function HashtagTitle(props) {
  let className = 'hashtag-title ';

  if (props.className) {
    className = className + props.className;
  }

  if (props.clickHandler) {
    className = className + ' clickable';
  }

  return (
    <h2 className={className} onClick={props.clickHandler} title={props.title} style={props.style}>
      # {props.children}
    </h2>
  );
}
