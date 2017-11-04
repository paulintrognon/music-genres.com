import React from 'react';

import './footer.css';

import Plus from '../../images/Plus';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="main-footer">
        <div className="main-footer-content">
          Design by&nbsp;
          <a href="https://fr.linkedin.com/in/margotbrun" target="_blank" rel="noopener noreferrer">
            Margot Brun
          </a>
          &nbsp;<Plus className="plus-sign" alt="-"></Plus>&nbsp;
          <a href="https://github.com/paulintrognon/music-genres.com" target="_blank" rel="noopener noreferrer">
            Code by&nbsp;
          </a>
          <a href="https://paulintrognon.fr/" target="_blank" rel="noopener noreferrer">
            Paulin Trognon
          </a>
        </div>
      </footer>
    );
  }
}
