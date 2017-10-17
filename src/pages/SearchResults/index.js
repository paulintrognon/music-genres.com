import React from 'react';
import { connect } from 'react-redux';
import {
  fetchSearchResultsAction
} from '../../actions/searchGenresActions';
import {
  goToMusicGenre
} from '../../actions/navigationActions';

import LoadingIndicator from '../../components/LoadingIndicator';
import SearchResult from './SearchResult';

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
        <h2>
          {this.props.match.params.query}
        </h2>
        <div>
          {this.renderResults()}
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
