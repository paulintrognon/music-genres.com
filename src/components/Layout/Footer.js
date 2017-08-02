import React from 'react';
import { Link } from 'react-router-dom';

import './footer.css';

export default function () {
  return (
    <footer className="main-footer">
      <a href="https://github.com/paulintrognon/" target="_blank">
        Paulin Trognon
      </a>
      &nbsp;-&nbsp;
      <a href="https://github.com/paulintrognon/music-genres.com" target="_blank">
        <i className="fa fa-github" aria-hidden="true"></i>
        &nbsp;Code
      </a>
    </footer>
  )
}
