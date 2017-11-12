import React from 'react';

import './style.css';

export default function TrackTitle(props) {
  const maxLength = props.maxLength || 35;
  return (
    <h3 className="track-title-component" title={props.title}>
      {props.title.length < maxLength ? props.title : props.title.substring(0, maxLength)+'…'}
    </h3>
  );
}
