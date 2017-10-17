import React from 'react';
import { connect } from 'react-redux';

import './suggestions.css';

function mapStoreToProps(store) {
  return {
    isFocused: store.searchGenre.isFocused,
    suggestions: store.searchGenre.suggestions,
    suggestionSelected: store.searchGenre.suggestionSelected,
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

  renderSuggestion(suggestion, i) {
    let className = 'suggestions-item';
    if (i === this.props.suggestionSelected) {
      className += ' selected';
    }
    return <li className={className} key={i}>
      {suggestion.name}
    </li>;
  }
}
export default connect(mapStoreToProps)(SearchGenreSuggestions);
