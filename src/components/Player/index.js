import React from 'react';
import { connect } from 'react-redux';

import './styles.css';

import closeImg from './close.png';
import HashtagTitle from '../HashtagTitle';
import TrackTitle from '../TrackTitle';
import Votes from '../Votes';

function mapStoreToProps(store) {
  return store.player;
}
class Player extends React.Component {

  renderPlayer = () => {
    return (
      <div className="player-content">
        <img className="close-button" src={closeImg} alt="close" />
        <HashtagTitle>{this.props.genre.name}</HashtagTitle>
        <div className="player-box">
          <iframe id="ytplayer" type="text/html" width="720" height="405" frameBorder="0"
            src={`http://www.youtube.com/embed/${this.props.track.playerTrackId}?autoplay=1&origin=http://www.music-genre.com`}
          />
          <div className="track-information">
            <TrackTitle title={this.props.track.title} maxLength={70} ></TrackTitle>
            <Votes upvotes={35}></Votes>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.isFetched) {
      return null;
    }
    return (
      <div className="player-container">
        {this.renderPlayer()}
      </div>
    );
  }
}
export default connect(mapStoreToProps)(Player);
