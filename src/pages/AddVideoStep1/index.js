import React from 'react';
import { connect } from 'react-redux';
import {
  goToAddVideoToGenre
} from '../../actions/navigationActions';

import BackgroundTitle from '../../components/BackgroundTitle';
import SearchGenre from '../../components/SearchGenre';
import RectangleButton from '../../components/RectangleButton';

import './style.css';

function mapStoreToProps(store) {
  return {
    genreTyped: store.searchGenre.text,
  };
}
class AddVideoStep1 extends React.Component {

  onSelectGenreHandler = (genreSlug) => {
    this.props.dispatch(goToAddVideoToGenre(genreSlug));
  }

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
            <span className="step-title">Select a genre related to your video</span>
            <span className="step-step">1/2</span>
          </h2>
          <SearchGenre searchGenresHandler={this.onSelectGenreHandler} selectGenreHandler={this.onSelectGenreHandler}></SearchGenre>
          <div className="validate-button-container">
            <RectangleButton className="validate-button" onClick={() => this.onSelectGenreHandler(this.props.genreTyped)}>
              Select Genre
            </RectangleButton>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(AddVideoStep1);
