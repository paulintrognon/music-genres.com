import React from 'react';
import { connect } from 'react-redux';

import BackgroundTitle from '../../components/BackgroundTitle';
import SearchGenre from '../../components/SearchGenre';
import RectangleButton from '../../components/RectangleButton';

import './style.css';

function mapStoreToProps() {
  return {};
}
class AddVideoStep1 extends React.Component {

  render() {
    return (
      <div className="add-video-container step-1">
        <div className="add-video-ruler-container">
          <hr className="add-video-ruler"/>
        </div>
        <div className="add-video-content">
          <BackgroundTitle className="add-video-background-title">
            Step One
          </BackgroundTitle>
          <h2 className="step-title">
            <span className="step-number">#1</span>
            <span className="step-title">Define a genre related to your video</span>
            <span className="step-step">1/2</span>
          </h2>
          <SearchGenre></SearchGenre>
          <div className="validate-button-container">
            <RectangleButton className="validate-button">
              Define Genre
            </RectangleButton>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(AddVideoStep1);
