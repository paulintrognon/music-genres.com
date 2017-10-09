import React from 'react';
import { connect } from 'react-redux';
import { changeFocusAction } from '../../actions/searchGenresActions';

import magnifyingGlass from './magnifying-glass.png';
import './searchGenres.css';

function mapStoreToProps(store) {
  return {
    isFocused: store.searchGenre.isFocused,
  };
}
class SearchGenre extends React.Component {

  onFocus() {
    this.props.dispatch(changeFocusAction(true));
  }

  onBlur() {
    this.props.dispatch(changeFocusAction(false));
  }

  render() {
    return (
      <p className="search-genres-container">
        <span className={"search-input-container " + (this.props.isFocused ? 'focused' : '')}>
          <input
            type="text"
            className="search-input"
            placeholder="Look for a genre"
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
          />
          <img src={magnifyingGlass} className="search-icon" alt="Search music genres!" />
        </span>
      </p>
    );
  }
}
export default connect(mapStoreToProps)(SearchGenre);
