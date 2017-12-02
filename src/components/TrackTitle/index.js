import React from 'react';

import './style.css';

export default function TrackTitle(props) {
  const maxLength = props.maxLength || 35;
  const style = {
    width: props.fullWidth ? '100%' : null,
  };

  return (
    <h3 className="track-title-component" title={props.title} style={style}>
      {props.title.length < maxLength ? props.title : props.title.substring(0, maxLength)+'…'}
    </h3>
  );
}
