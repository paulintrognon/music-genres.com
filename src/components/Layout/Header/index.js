import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';
import logo from './logo.png';
import plusImage from '../../../images/plus.png';

export default class Header extends React.Component {
  render() {
    return (
      <header className="main-header">
        <div className="main-logo">
          <Link to='/'>
            <img src={logo} alt="Music Genres"/>
          </Link>
        </div>
        <div className="side-buttons">
          <Link to={'/tracks/add'} className="side-button">
            Add video
            <img src={plusImage} alt="plus" />
          </Link>
        </div>
      </header>
    );
  }
}
