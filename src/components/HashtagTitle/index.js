import React from 'react';

import './style.css';

export default function HashtagTitle(props) {
  return (
    <h2 className="hashtag-title">
      # {props.children}
    </h2>
  );
}
