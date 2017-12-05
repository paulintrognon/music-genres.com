import React from 'react';
import { connect } from 'react-redux';

import {
  goToAddVideo,
} from '../../actions/navigationActions';
import {
  loadGenreAction,
  parseTrackUrlAction,
  addTrackToGenreAction
} from '../../actions/addTrackActions';

import BigInput from '../../components/BigInput';
import HashtagTitle from '../../components/HashtagTitle';
import LoadingIndicator from '../../components/LoadingIndicator';
import BackgroundTitle from '../../components/BackgroundTitle';
import RectangleButton from '../../components/RectangleButton';
import VideoPreview from './VideoPreview';

import './style.css';

function mapStoreToProps(store) {
  return {
    url: store.addTrack.url,
    isLoading: store.addTrack.isLoading,
    genre: store.addTrack.genre,
    track: store.addTrack.track,
    error: store.addTrack.error,
  };
}
class AddVideoToGenre extends React.Component {
  componentWillMount() {
    this.props.dispatch(loadGenreAction(this.props.match.params.genre));
  }

  handleChange = (event) => {
    const url = event.target.value.trim();
    this.props.dispatch(parseTrackUrlAction(url));
  }

  goBack = () => {
    this.props.dispatch(goToAddVideo());
  }

  validateTrack = () => {
    if (!this.props.url) {
      return;
    }
    this.props.dispatch(addTrackToGenreAction(this.props.url, this.props.genre));
  }

  renderPreview() {
    if (this.props.loading) {
      return (
        <p style={{textAlign: 'center', marginTop: '30px'}}>
          <LoadingIndicator />
        </p>
      )
    }
    if (this.props.error) {
      return (
        <p style={{textAlign: 'center', marginTop: '30px'}}>
          Could not recognise track
        </p>
      )
    }
    if (!this.props.track.id) {
      return null;
    }
    return (
      <VideoPreview
        trackId={this.props.track.id}
        trackTitle={this.props.track.title}
        >
      </VideoPreview>
    );
  }

  renderContent() {
    if (!this.props.genre) {
      return null;
    }
    return (
      <div>
        <HashtagTitle>
          {this.props.genre.name}
        </HashtagTitle>
        <BigInput
          placeholder="Paste a YouTube link to your video example here"
          value={this.props.url}
          onChange={this.handleChange}
        />
        {this.renderPreview()}
        <div className="validate-button-container">
          <RectangleButton className="validate-button alternative" onClick={this.goBack}>
            Change Genre
          </RectangleButton>
          <RectangleButton className="validate-button" onClick={this.validateTrack}>
            Add video
          </RectangleButton>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="add-video-container step-2">
        <div className="add-video-ruler-container">
          <hr className="add-video-ruler"/>
        </div>
        <div className="add-video-content">
          <BackgroundTitle className="add-video-background-title">
            Step Two
          </BackgroundTitle>
          <h3 className="step-title">
            <span className="step-number">#2</span>
            <span className="step-title">Link a video related to your genre</span>
            <span className="step-step">2/2</span>
          </h3>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(AddVideoToGenre);
