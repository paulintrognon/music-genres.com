import React from 'react';
import { connect } from 'react-redux';
import { validSuggestion } from '../../actions/searchGenresActions';

import './suggestions.css';
import Suggestion from './Suggestion';

function mapStoreToProps(store) {
  return {
    isFocused: store.searchGenre.isFocused,
    suggestions: store.searchGenre.suggestions,
    selectedSuggestion: store.searchGenre.selectedSuggestion,
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

  onClickHandler(value) {
    this.props.dispatch(validSuggestion(value));
  }

  render() {
    if (!this.props.isFocused || !this.props.suggestions.length) {
      return '';
    }
    return (
      <ul className="suggestions-container">
        {this.props.suggestions.map((suggestion, i) => (
          <Suggestion key={i}
              value={suggestion.slug}
              name={suggestion.name}
              isSelected={i === this.props.selectedSuggestion}
              onSuggestionClick={this.onClickHandler}
          ></Suggestion>
        ))}
      </ul>
    );
  }
}
export default connect(mapStoreToProps)(SearchGenreSuggestions);