import React from 'react';
import { connect } from 'react-redux';
import {
  fetchSearchResultsAction
} from '../../actions/searchGenresActions';
import {
  goToMusicGenre
} from '../../actions/navigationActions';

import './searchResults.css';

import LoadingIndicator from '../../components/LoadingIndicator';
import SearchResult from './SearchResult';
import SearchGenres from '../../components/SearchGenres'

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

  render() {
    return (
      <div className="search-results-container">
        <h2 className="hashtag-title">
          # {this.props.match.params.query}
        </h2>
        <div className="search-results">
          <p className="phrase">
            Are you looking for one of those genres?
          </p>
          <div>
            {this.renderResults()}
          </div>
        </div>
        <div className="continue-search">
          <p className="phrase">
            Not what you were looking for?
          </p>
          <SearchGenres></SearchGenres>
        </div>
      </div>
    );
  }

  onClickHandler = (slug) => {
    this.props.dispatch(goToMusicGenre(slug));
  }

  renderResults() {
    if (!this.props.searchResults) {
      return <LoadingIndicator></LoadingIndicator>;
    }
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
