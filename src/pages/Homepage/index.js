import React from 'react';

import './homepage.css';
import or from './or.png';
import magnifyingGlass from './magnifying-glass.png';

export default class Homepage extends React.Component {
  render() {
    return (
      <div className="homepage-container">
        <p className="search-container">
          <span className="search-input-container">
            <input type="text" className="search-input" placeholder="Look for a genre" />
            <img src={magnifyingGlass} className="search-icon" />
          </span>
        </p>
        <p className="or-container">
          <img src={or} alt="or" />
        </p>
        <p className="random-container">
          <button className="random-button">
            Get surprised
          </button>
        </p>
      </div>
    );
  }
}
