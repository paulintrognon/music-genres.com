import React from 'react';
import { connect } from 'react-redux';

function mapStoreToProps(store) {
  return {
    suggestions: store.searchGenre.suggestions,
  };
}
class SearchGenreSuggestions extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  render() {
    if (!this.props.suggestions.length) {
      return '';
    }
    return (
      <ul>
        {this.props.suggestions.map(renderSuggestion)}
      </ul>
    );
  }
}
export default connect(mapStoreToProps)(SearchGenreSuggestions);

function renderSuggestion(suggestion) {
  return <li>
    {suggestion.name}
  </li>
}
