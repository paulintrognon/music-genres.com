import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  typeAction,
  changeFocusAction,
  suggestGenresAction,
  resetGenresSuggestionsAction,
  selectSuggestionAction
} from '../../actions/searchGenresActions';

import BigInput from '../BigInput';
import SearchGenreSuggestions from './SearchGenreSuggestions';
import magnifyingGlass from './magnifying-glass.png';
import './searchGenres.css';

function mapStoreToProps(store) {
  return {
    text: store.searchGenre.text,
    suggestions: store.searchGenre.suggestions,
    isFocused: store.searchGenre.isFocused,
    selectedSuggestion: store.searchGenre.selectedSuggestion,
  };
}
class SearchGenre extends React.Component {
  componentWillMount() {
    this.props.dispatch(resetGenresSuggestionsAction());
  }

  onFocus = () => {
    this.props.dispatch(changeFocusAction(true));
  }

  onBlur = () => {
    if (!this.props.text.length) {
      this.props.dispatch(changeFocusAction(false));
    }
  }

  handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      this.props.dispatch(selectSuggestionAction('down'));
    } else if (event.key === 'ArrowUp') {
      this.props.dispatch(selectSuggestionAction('up'));
    } else if (event.key === 'Enter') {
      const selectedSuggestion = this.props.suggestions[this.props.selectedSuggestion];
      if (selectedSuggestion) {
        this.props.selectGenreHandler(selectedSuggestion.slug);
        this.resetUi();
      } else {
        this.searchGenre();
      }
    }
  }

  handleChange = (event) => {
    const text = event.target.value;
    this.props.dispatch(typeAction(text));
    if (text.length > 0) {
      this.props.dispatch(suggestGenresAction(text));
    } else {
      this.props.dispatch(resetGenresSuggestionsAction());
    }
  }

  handleSearchClick = () => {
    this.searchGenre();
  }

  searchGenre() {
    if (!this.props.text) {
      return;
    }
    this.props.searchGenresHandler(this.props.text);
    this.resetUi();
  }

  resetUi() {
    this.inputField.blur();
    window.scrollTo(0,0);
    this.props.dispatch(typeAction(''));
  }

  render() {
    return (
      <div className="search-genres-container" onKeyDown={this.handleKeyDown}>
        <p>
          <span className="search-input-container">
            <BigInput
              refHandler={(c) => { this.inputField = c; }}
              isFocused={this.props.isFocused}
              placeholder="Look for a genre"
              onChange={this.handleChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              value={this.props.text}
            />
            <img src={magnifyingGlass} className="search-icon" alt="Search music genres!" onClick={this.handleSearchClick} />
          </span>
        </p>
        <SearchGenreSuggestions selectGenreHandler={this.props.selectGenreHandler}></SearchGenreSuggestions>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(SearchGenre);

SearchGenre.propTypes = {
   searchGenresHandler: PropTypes.func.isRequired,
   selectGenreHandler: PropTypes.func.isRequired,
}
