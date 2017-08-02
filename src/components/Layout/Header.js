import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

export default function () {
  return (
    <header className="main-header">
      <nav className="main-nav">
        <Link to={'/'} className="main-nav-brand">music-genres.com</Link>

        <div className="side-links">
          <Link to={'/browse'} className="side-link">Browse</Link>
          <Link to={'/random'} className="side-link">Random</Link>
        </div>
      </nav>
    </header>
  )
}
