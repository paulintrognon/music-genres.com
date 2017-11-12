import React from 'react';
import { connect } from 'react-redux';

import {
  fetchMusicGenreAction,
  upvoteTrackAction,
  downvoteTrackAction,
} from '../../actions/musicGenreActions';

import HashtagTitle from '../../components/HashtagTitle';
import LoadingIndicator from '../../components/LoadingIndicator';
import Plus from '../../components/images/Plus';
import RectangleButton from '../../components/RectangleButton';
import Track from './Track';
import Player from '../../components/Player';

import './musicGenre.css';

function mapStoreToProps(store) {
  return store.musicGenre;
}
class MusicGenre extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchMusicGenreAction(this.props.match.params.slug));
  }

  upvoteTrack = (trackId) => {
    this.props.dispatch(upvoteTrackAction(trackId, this.props.musicGenre.id));
  }
  downvoteTrack = (trackId) => {
    this.props.dispatch(downvoteTrackAction(trackId, this.props.musicGenre.id));
  }

  render() {
    return (
      <div className="music-genre-page">
        <Player></Player>
        {this.renderContent()}
      </div>
    );
  }

  renderContent = () => {
    if (this.props.isFetching) {
      return <LoadingIndicator></LoadingIndicator>;
    }
    if (this.props.error) {
      return <p>Erreur !</p>;
    }
    if (this.props.isFetched) {
      return <div>
        <HashtagTitle>{this.props.musicGenre.name}</HashtagTitle>
        {this.renderTracks(this.props.musicGenre.tracks)}
      </div>;
    }
    return null;
  }

  renderTracks = (tracks) => {
    if (!tracks.length) {
      return <p>No tracks yet.</p>
    }
    const topTracks = tracks.slice(0,3);
    const otherTracks = tracks.slice(3);
    return (
      <div>
        <div className="top-tracks-container">
          {[0,1,2].map(index => (
            <Track key={index} track={topTracks[index]} index={index} upvoteTrackHandler={this.upvoteTrack} downvoteTrackHandler={this.downvoteTrack}></Track>
          ))}
        </div>
        {this.renderAddTrack()}
        <HashtagTitle className="more-of-title">More from {this.props.musicGenre.name}</HashtagTitle>
        <div className="other-tracks-container">
          {otherTracks.map((track, i) => (
            <Track key={i} track={track} upvoteTrackHandler={this.upvoteTrack} downvoteTrackHandler={this.downvoteTrack}></Track>
          ))}
        </div>
        {this.renderAddTrack()}
      </div>
    );
  }

  renderAddTrack = () => {
    return (
      <div className="add-track-row">
        <RectangleButton>
          Add a track&nbsp;<Plus></Plus>
        </RectangleButton>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(MusicGenre);
