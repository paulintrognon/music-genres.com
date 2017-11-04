import React from 'react';

import './footer.css';

import plusImage from '../../../images/plus.png';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="main-footer">
        <div className="main-footer-content">
          Design by&nbsp;
          <a href="https://fr.linkedin.com/in/margotbrun" target="_blank" rel="noopener noreferrer">
            Margot Brun
          </a>
          &nbsp;<img src={plusImage} className="plus-sign" alt="-" />&nbsp;
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
