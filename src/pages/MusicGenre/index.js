import React from 'react';
import { connect } from 'react-redux';

import {
  goToAddVideoToGenre
} from '../../actions/navigationActions';
import {
  fetchMusicGenreAction,
  voteForTrackAction,
} from '../../actions/musicGenreActions';
import {
  playTrackAction,
} from '../../actions/playerActions';

import HashtagTitle from '../../components/HashtagTitle';
import LoadingIndicator from '../../components/LoadingIndicator';
import Plus from '../../components/images/Plus';
import RectangleButton from '../../components/RectangleButton';
import Track from './Track';

import './musicGenre.css';

function mapStoreToProps(store) {
  return store.musicGenre;
}
class MusicGenre extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchMusicGenreAction(this.props.match.params.slug));
  }

  voteForTrack = (track) => {
    this.props.dispatch(voteForTrackAction(track, this.props.musicGenre.id));
  }

  playTrack = (trackIndex) => {
    this.props.dispatch(playTrackAction(trackIndex, this.props.musicGenre));
  }

  addVideoToThisGenre = () => {
    this.props.dispatch(goToAddVideoToGenre(this.props.musicGenre.slug, true));
  }

  render() {
    return (
      <div className="music-genre-page">
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
    const otherTracks = tracks.slice(3);
    return (
      <div>
        <div className="top-tracks-container">
          {[0,1,2].map(index => (
            <Track key={index}
              track={tracks[index]}
              index={index}
              onVoteHandler={() => this.voteForTrack(tracks[index])}
              onPlayHandler={() => this.playTrack(index)}
              ></Track>
          ))}
        </div>
        {this.renderAddTrack()}
        <HashtagTitle className="more-of-title">More from {this.props.musicGenre.name}</HashtagTitle>
        <div className="other-tracks-container">
          {otherTracks.map((track, i) => (
            <Track key={i}
              track={track}
              onVoteHandler={() => this.voteForTrack(track)}
              onPlayHandler={() => this.playTrack(i+3)}
              ></Track>
          ))}
        </div>
        {this.renderAddTrack()}
      </div>
    );
  }

  renderAddTrack = () => {
    return (
      <div className="add-track-row">
        <RectangleButton onClick={this.addVideoToThisGenre}>
          Add video&nbsp;<Plus></Plus>
        </RectangleButton>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(MusicGenre);
