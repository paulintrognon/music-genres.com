import React from 'react';

import './style.css';

export default function HashtagTitle(props) {
  const className = 'hashtag-title ' + props.className;
  return (
    <h2 className={className}>
      # {props.children}
    </h2>
  );
}
