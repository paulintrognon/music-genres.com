import React from 'react';
import { connect } from 'react-redux';
import { changeFocusAction, suggestGenresAction } from '../../actions/searchGenresActions';

import magnifyingGlass from './magnifying-glass.png';
import './searchGenres.css';

function mapStoreToProps(store) {
  return {
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
    this.props.dispatch(changeFocusAction(false));
  }

  handleChange(event) {
    const text = event.target.value;
    this.setState({ text });
    if (text.length >= 3) {
      this.props.dispatch(suggestGenresAction(text));
    }
  }

  render() {
    return (
      <p className="search-genres-container">
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
    );
  }
}
export default connect(mapStoreToProps)(SearchGenre);
