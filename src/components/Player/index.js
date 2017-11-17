import React from 'react';
import { connect } from 'react-redux';
import {
  playTrackAction,
  closePlayerAction,
} from '../../actions/playerActions';

import './styles.css';

import closeImg from './close.png';
import leftArrowImg from './left_arrow.png';
import leftArrowHoverImg from './left_arrow_hover.png';
import rightArrowImg from './right_arrow.png';
import rightArrowHoverImg from './right_arrow_hover.png';

import HashtagTitle from '../HashtagTitle';
import TrackTitle from '../TrackTitle';
import Votes from '../Votes';

function mapStoreToProps(store) {
  return store.player;
}
class Player extends React.Component {
  closePlayer = () => {
    this.props.dispatch(closePlayerAction())
  }

  playTrack = (trackIndex) => {
    this.props.dispatch(playTrackAction(trackIndex, this.props.genre));
  }

  renderPlayer = () => {
    return (
      <div className="player-content">
        <img className="close-button" src={closeImg} alt="close" onClick={this.closePlayer} />
        <HashtagTitle>{this.props.genre.name}</HashtagTitle>
        <div className="player-box">
          <iframe id="ytplayer" type="text/html" width="720" height="405" frameBorder="0" title="Youtube Player"
            src={`http://www.youtube.com/embed/${this.props.track.playerTrackId}?autoplay=1&origin=http://www.music-genre.com`}
          />
          <div className="track-information">
            <TrackTitle title={this.props.track.title} maxLength={70} ></TrackTitle>
            <Votes upvotes={35}></Votes>
          </div>
        </div>
        {!this.props.hasPreviousTrack ? null : (
          <div className="arrow-container left-arrow-container" onClick={() => this.playTrack(this.props.trackIndex-1)}>
            <img className="normal" src={leftArrowImg} alt="previous track" />
            <img className="hover" src={leftArrowHoverImg} alt="previous track" />
          </div>
        )}
        {!this.props.hasNextTrack ? null : (
          <div className="arrow-container right-arrow-container" onClick={() => this.playTrack(this.props.trackIndex+1)}>
            <img className="normal" src={rightArrowImg} alt="previous track" />
            <img className="hover" src={rightArrowHoverImg} alt="previous track" />
          </div>
        )}
      </div>
    );
  }

  render() {
    const classes = ['player-container', 'hidable'];
    if (!this.props.isActive) {
      classes.push('hidden');
    }
    return (
      <div className={classes.join(' ')}>
        {this.props.isActive ? this.renderPlayer() : null}
      </div>
    );
  }
}
export default connect(mapStoreToProps)(Player);
