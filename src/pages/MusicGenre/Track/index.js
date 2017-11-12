import React from 'react';

import './style.css';

import playImage from './play.png';
import playHoverImage from './play_hover.png';
import TrackTitle from '../../../components/TrackTitle';
import Votes from '../../../components/Votes';

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
        <TrackTitle title={track.title}></TrackTitle>
        <Votes upvotes={track.upvotes} hasUpvoted={track.hasUpvoted} onVote={() => vote(props)}></Votes>
      </div>
    </div>
  );
}

function vote(props) {
  if (!props.track.hasUpvoted) {
    props.upvoteTrackHandler(props.track.id);
  } else {
    props.downvoteTrackHandler(props.track.id);
  }
}
