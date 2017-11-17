import React from 'react';

import './styles.css';

export default function Votes(props) {
  const track = props.track;
  return (
    <div className="track-votes-container">
      <p className="track-votes-count">
        {track.upvotes} vote{track.upvotes > 1 ? 's' : ''}
      </p>
      <p className={'track-upvote-button' + (track.hasUpvoted ? ' has-upvoted' : '')} onClick={props.onVote}>
        <span>+1</span>
      </p>
    </div>
  );
}
