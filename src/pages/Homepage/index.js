import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  goToSearchResultsAction,
  validSuggestionAction
} from '../../actions/searchGenresActions';
import {
  closePlayerAction,
} from '../../actions/playerActions';

import { goToRandomPage } from '../../actions/navigationActions';

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

  componentWillMount() {
    this.props.dispatch(closePlayerAction());
  }

  searchGenresHandler = (queryString) => {
    this.props.dispatch(goToSearchResultsAction(queryString));
  }

  selectGenreHandler = (genreSlug) => {
    this.props.dispatch(validSuggestionAction(genreSlug));
  }

  randomTrackHandler = () => {
    this.props.dispatch(goToRandomPage());
  }

  render() {
    return (
      <div className="homepage-container">
        <p className="homepage__baseline">
          Discover genres by listening to what they sound
        </p>
        <p className="homepage__subbaseline">
          Music Genres gives you a sonore definition of musical genres by listening to YouTube videos.
        </p>
        <SearchGenre searchGenresHandler={this.searchGenresHandler} selectGenreHandler={this.selectGenreHandler} ></SearchGenre>
        <div className={this.props.isSearchFocused ? 'hidden' : ''}>
          <p className="homepage__examples">
            Examples:
            <Link to={'salsa'} className="homepage__example">Salsa</Link>
            <Link to={'rock'} className="homepage__example">Rock</Link>
            <Link to={'blues'} className="homepage__example">Blues</Link>
            <Link to={'electro'} className="homepage__example">Electro</Link>
          </p>
          <p className="or-container">
            <img src={or} alt="or" />
          </p>
          <p className="random-container">
            <RectangleButton onClick={this.randomTrackHandler}>
              Random Genre
            </RectangleButton>
          </p>
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(Homepage);
