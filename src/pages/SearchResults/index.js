import React from 'react';
import { connect } from 'react-redux';

function mapStoreToProps(store) {
  return store;
}
class SearchResults extends React.Component {
  render() {
    return (
      <div className="search-results-container">
        {this.props.match.params.query}
      </div>
    );
  }
}
export default connect(mapStoreToProps)(SearchResults);
