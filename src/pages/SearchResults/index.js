import React from 'react';
import { connect } from 'react-redux';
import {
  fetchSearchResultsAction,
  goToSearchResultsAction,
  validSuggestionAction
} from '../../actions/searchGenresActions';
import {
  goToMusicGenre
} from '../../actions/navigationActions';

import './searchResults.css';

import LoadingIndicator from '../../components/LoadingIndicator';
import SearchResult from './SearchResult';
import SearchGenre from '../../components/SearchGenre';
import HashtagTitle from '../../components/HashtagTitle';

function mapStoreToProps(store) {
  return {
    searchResults: store.searchGenre.results,
  };
}
class SearchResults extends React.Component {
  componentWillMount() {
    if (!this.props.searchResults) {
      this.props.dispatch(fetchSearchResultsAction(this.props.match.params.query));
    }
  }

  searchGenresHandler = (queryString) => {
    this.props.dispatch(goToSearchResultsAction(queryString));
    this.props.dispatch(fetchSearchResultsAction(queryString));
  }

  selectGenreHandler = (genreSlug) => {
    this.props.dispatch(validSuggestionAction(genreSlug));
  }

  render() {
    return (
      <div className="search-results-container">
        <HashtagTitle>{this.props.match.params.query}</HashtagTitle>
        {this.renderResultsDiv()}
        <div className="continue-search">
          <p className="phrase">
            Not what you were looking for?
          </p>
          <SearchGenre searchGenresHandler={this.searchGenresHandler} selectGenreHandler={this.selectGenreHandler}></SearchGenre>
        </div>
      </div>
    );
  }

  onClickHandler = (slug) => {
    this.props.dispatch(goToMusicGenre(slug));
  }

  renderResultsDiv = () => {
    if (!this.props.searchResults) {
      return <LoadingIndicator></LoadingIndicator>;
    }
    if (!this.props.searchResults.length) {
      return (
        <p>
          Sorry, no results!
        </p>
      );
    }
    return (
      <div className="search-results">
        <p className="phrase">
          Are you looking for one of those genres?
        </p>
        <div>
          {this.renderResults()}
        </div>
      </div>
    );
  }

  renderResults = () => {
    return this.props.searchResults.map((result, i) => (
      <SearchResult key={i}
        name={result.name}
        value={result.slug}
        onClickHandler={this.onClickHandler}
        ></SearchResult>
    ));
  }
}
export default connect(mapStoreToProps)(SearchResults);
