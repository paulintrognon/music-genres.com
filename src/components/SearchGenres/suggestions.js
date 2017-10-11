import React from 'react';
import { connect } from 'react-redux';

import './suggestions.css';

function mapStoreToProps(store) {
  return {
    isFocused: store.searchGenre.isFocused,
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
    if (!this.props.isFocused || !this.props.suggestions.length) {
      return '';
    }
    return (
      <ul className="suggestions-container">
        {this.props.suggestions.map(this.renderSuggestion.bind(this))}
      </ul>
    );
  }

  renderSuggestion(suggestion) {
    return <li className="suggestions-item">
      {suggestion.name}
    </li>;
  }
}
export default connect(mapStoreToProps)(SearchGenreSuggestions);
