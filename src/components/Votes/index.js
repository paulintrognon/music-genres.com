import React from 'react';

import './styles.css';

export default function Votes(props) {
  return (
    <div className="track-votes-container">
      <p className="track-votes-count">
        {props.upvotes} vote{props.upvotes > 1 ? 's' : ''}
      </p>
      <p className={'track-upvote-button' + (props.hasUpvoted ? ' has-upvoted' : '')} onClick={props.onVote}>
        <span>+1</span>
      </p>
    </div>
  );
}
