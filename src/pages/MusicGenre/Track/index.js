import React from 'react';

import './style.css';

import plus1Image from './+1.png';

export default function Track(props) {
  if (!props.track) {
    return null;
  }
  const track = props.track;
  const marginTop = props.index * 70;
  const style = {
    marginTop: `${marginTop}px`,
  };
  return (
    <div className="track-box" style={style}>
      <p className="track-thumb" style={{ backgroundImage: `url('https://img.youtube.com/vi/${track.playerTrackId}/hqdefault.jpg')` }}></p>
      <div className="track-information">
        <h3 className="track-title">
          {track.title}
        </h3>
        <p className="track-votes">
          100 Votes
          <img className="plus-1" src={plus1Image} alt="+1" />
        </p>
      </div>
    </div>
  );
}
