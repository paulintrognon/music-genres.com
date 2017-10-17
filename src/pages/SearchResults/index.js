import React from 'react';
import { connect } from 'react-redux';

import { fetchSearchResultsAction } from '../../actions/searchGenresActions';

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

  renderResults() {
    if (!this.props.searchResults) {
      return '';
    }
    return this.props.searchResults.map((result, i) => (
      <div key={i}>{result.name}</div>
    ));
  }
}
export default connect(mapStoreToProps)(SearchResults);
