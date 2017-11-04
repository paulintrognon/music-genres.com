import React from 'react';

import './style.css';

import plus1Image from './+1.png';
import playImage from './play.png';
import playHoverImage from './play_hover.png';

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
      <div className="track-thumb"
        style={{ backgroundImage: `url('https://img.youtube.com/vi/${track.playerTrackId}/hqdefault.jpg')` }}
        title={`Play "${track.title}"`}
        >
          <p className="play-button play-button-normal"
            style={{ backgroundImage: `url('${playImage}')` }}
            >
          </p>
          <p className="play-button play-button-hover"
            style={{ backgroundImage: `url('${playHoverImage}')` }}
            >
          </p>
      </div>
      <div className="track-information">
        <h3 className="track-title" title={track.title}>
          {track.title.length < 40 ? track.title : track.title.substring(0, 40)+'…'}
        </h3>
        <p className="track-votes">
          100 Votes
          <img className="plus-1" src={plus1Image} alt="+1" />
        </p>
      </div>
    </div>
  );
}
