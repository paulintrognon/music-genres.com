import React from 'react';
import { connect } from 'react-redux';

import BigInput from '../../components/BigInput';
import BackgroundTitle from '../../components/BackgroundTitle';
import SearchGenre from '../../components/SearchGenre';
import RectangleButton from '../../components/RectangleButton';

import './style.css';

function mapStoreToProps() {
  return {};
}
class AddVideoToGenre extends React.Component {

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
          <h2 className="step-title">
            <span className="step-number">#2</span>
            <span className="step-title">Link a video related to your genre</span>
            <span className="step-step">2/2</span>
          </h2>
          <BigInput placeholder="Copy a YouTube link to your video example here" />
          <div className="validate-button-container">
            <RectangleButton className="validate-button alternative">
              Change Genre
            </RectangleButton>
            <RectangleButton className="validate-button">
              Add video
            </RectangleButton>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(AddVideoToGenre);
