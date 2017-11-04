import React from 'react';
import { connect } from 'react-redux';

import {
  fetchMusicGenreAction,
} from '../../actions/musicGenreActions';

import HashtagTitle from '../../components/HashtagTitle';
import LoadingIndicator from '../../components/LoadingIndicator';
import Track from './Track';

import './musicGenre.css';

function mapStoreToProps(store) {
  return store.musicGenre;
}
class MusicGenre extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchMusicGenreAction(this.props.match.params.slug));
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
    return (
      <div className="top-tracks-container">
        <Track track={tracks[0]} index={0}></Track>
        <Track track={tracks[1]} index={1}></Track>
        <Track track={tracks[2]} index={2}></Track>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(MusicGenre);