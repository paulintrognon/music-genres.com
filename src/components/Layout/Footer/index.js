import React from 'react';

import './footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="main-footer">
        Design by&nbsp;
        <a href="https://fr.linkedin.com/in/margotbrun" target="_blank" rel="noopener noreferrer">
          Margot Brun
        </a>
        &nbsp;-&nbsp;
        <a href="https://github.com/paulintrognon/music-genres.com" target="_blank" rel="noopener noreferrer">
          Code by&nbsp;
        </a>
        <a href="https://paulintrognon.fr/" target="_blank" rel="noopener noreferrer">
          Paulin Trognon
        </a>
      </footer>
    );
  }
}
