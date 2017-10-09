import React from 'react';
import { connect } from 'react-redux';

import './homepage.css';
import or from './or.png';

import SearchGenre from '../../components/SearchGenres';

function mapStoreToProps(store) {
  return {
    isSearchFocused: store.searchGenre.isFocused,
  };
}
class Homepage extends React.Component {
  render() {
    return (
      <div className="homepage-container">
        <SearchGenre></SearchGenre>
        <div className={this.props.isSearchFocused ? 'hidden' : ''}>
          <p className="or-container">
            <img src={or} alt="or" />
          </p>
          <p className="random-container">
            <button className="random-button">
              Get surprised
            </button>
          </p>
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(Homepage);
