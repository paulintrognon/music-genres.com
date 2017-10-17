import React from 'react';
import { connect } from 'react-redux';

import './suggestions.css';
import Suggestion from './Suggestion';

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
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    console.log(this.props.suggestionSelected);
  }

  render() {
    if (!this.props.isFocused || !this.props.suggestions.length) {
      return '';
    }
    return (
      <ul className="suggestions-container">
        {this.props.suggestions.map((suggestion, i) => (
          <Suggestion key={i}
              name={suggestion.name}
              isSelected={i === this.props.suggestionSelected}
              onSuggestionClick={this.onClickHandler}
          ></Suggestion>
        ))}
      </ul>
    );
  }
}
export default connect(mapStoreToProps)(SearchGenreSuggestions);
