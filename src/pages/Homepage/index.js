import React from 'react';
import { connect } from 'react-redux';
import {
  goToSearchResultsAction
} from '../../actions/searchGenresActions';

import {
  playRandomTrackAction
} from '../../actions/playerActions';

import './homepage.css';
import or from './or.png';

import RectangleButton from '../../components/RectangleButton';
import SearchGenre from '../../components/SearchGenres';

function mapStoreToProps(store) {
  return {
    isSearchFocused: store.searchGenre.isFocused,
  };
}
class Homepage extends React.Component {

  searchGenresHandler = (queryString) => {
    this.props.dispatch(goToSearchResultsAction(queryString));
  }

  randomTrackHandler = () => {
    this.props.dispatch(playRandomTrackAction());
  }

  render() {
    return (
      <div className="homepage-container">
        <SearchGenre searchGenresHandler={this.searchGenresHandler}></SearchGenre>
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
