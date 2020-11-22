import React from 'react';

import './style.css';

import playImage from './play.png';
import TrackTitle from '../../../components/TrackTitle';
import Votes from '../../../components/Votes';

export default function Track(props) {
  if (!props.track) {
    return null;
  }
  const { track } = props;
  const className = `index-${props.index + 1}`;
  return (
    <div className={`track-box-container ${className}`}>
      <div className="track-box">
        <button
          type="button"
          className="track-thumb"
          style={{
            backgroundImage: `url('https://img.youtube.com/vi/${track.playerTrackId}/hqdefault.jpg')`,
          }}
          title={`Play "${track.title}"`}
          onClick={props.onPlayHandler}
        >
          <p
            className="play-button play-button-normal"
            style={{ backgroundImage: `url('${playImage}')` }}
          />
        </button>
        <div className="track-information">
          <TrackTitle title={track.title} />
          <Votes track={track} onVote={props.onVoteHandler} />
        </div>
      </div>
    </div>
  );
}
