import React from 'react';
import { connect } from 'react-redux';
import {
  goToSearchResultsAction,
  validSuggestionAction
} from '../../actions/searchGenresActions';

import {
  playRandomTrackAction
} from '../../actions/playerActions';

import './homepage.css';
import or from './or.png';

import RectangleButton from '../../components/RectangleButton';
import SearchGenre from '../../components/SearchGenre';

function mapStoreToProps(store) {
  return {
    isSearchFocused: store.searchGenre.isFocused,
  };
}
class Homepage extends React.Component {

  searchGenresHandler = (queryString) => {
    this.props.dispatch(goToSearchResultsAction(queryString));
  }

  selectGenreHandler = (genreSlug) => {
    this.props.dispatch(validSuggestionAction(genreSlug));
  }

  randomTrackHandler = () => {
    this.props.dispatch(playRandomTrackAction());
  }

  render() {
    return (
      <div className="homepage-container">
        <SearchGenre searchGenresHandler={this.searchGenresHandler} selectGenreHandler={this.selectGenreHandler} ></SearchGenre>
        <div className={this.props.isSearchFocused ? 'hidden' : ''}>
          <p className="or-container">
            <img src={or} alt="or" />
          </p>
          <p className="random-container">
            <RectangleButton onClick={this.randomTrackHandler}>
              Get surprised
            </RectangleButton>
          </p>
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(Homepage);
