import React from 'react';
import { connect } from 'react-redux';
import {
  changeFocusAction,
  suggestGenresAction,
  resetGenresSuggestionsAction,
  selectSuggestion
} from '../../actions/searchGenresActions';

import SearchGenreSuggestions from './SearchGenreSuggestions';
import magnifyingGlass from './magnifying-glass.png';
import './searchGenres.css';

function mapStoreToProps(store) {
  return {
    suggestions: store.searchGenre.suggestions,
    isFocused: store.searchGenre.isFocused,
  };
}
class SearchGenre extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  onFocus() {
    this.props.dispatch(changeFocusAction(true));
  }

  onBlur() {
    if (!this.state.text.length) {
      this.props.dispatch(changeFocusAction(false));
    }
  }

  handleKeyDown(event) {
    if (event.key === 'ArrowDown') {
      this.props.dispatch(selectSuggestion('down'));
    } else if (event.key === 'ArrowUp') {
      this.props.dispatch(selectSuggestion('up'));
    }
  }

  handleChange(event) {
    const text = event.target.value;
    this.setState({ text });
    if (text.length >= 3) {
      this.props.dispatch(suggestGenresAction(text));
    } else {
      this.props.dispatch(resetGenresSuggestionsAction());
    }
  }

  render() {
    return (
      <div className="search-genres-container" onKeyDown={this.handleKeyDown.bind(this)}>
        <p>
          <span className={"search-input-container " + (this.props.isFocused ? 'focused' : '')}>
            <input
              type="text"
              className="search-input"
              placeholder="Look for a genre"
              onChange={this.handleChange.bind(this)}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
              value={this.state.text}
            />
            <img src={magnifyingGlass} className="search-icon" alt="Search music genres!" />
          </span>
        </p>
        <SearchGenreSuggestions></SearchGenreSuggestions>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(SearchGenre);
