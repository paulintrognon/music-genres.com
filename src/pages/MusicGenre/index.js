import React from 'react';
import { connect } from 'react-redux';

import {
  fetchMusicGenreAction,
} from '../../actions/musicGenreActions';

import HashtagTitle from '../../components/HashtagTitle';
import LoadingIndicator from '../../components/LoadingIndicator';

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
      </div>;
    }
    return <p>?</p>;
  }
}
export default connect(mapStoreToProps)(MusicGenre);
