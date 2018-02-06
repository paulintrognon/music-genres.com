import React from 'react';
import { Link } from 'react-router-dom';
import { resetAllAction } from '../../../actions/navigationActions';
import store from '../../../store';

import './header.css';
import logo from './logo.png';
import Plus from '../../images/Plus';

export default class Header extends React.Component {
  resetAll = () => {
    store.dispatch(resetAllAction());
  }

  render() {
    return (
      <header className="main-header">
        <div className="main-logo">
          <Link to='/' onClick={this.resetAll}>
            <img src={logo} alt="Music Genres"/>
          </Link>
        </div>
        <div className="side-buttons">
          <Link to={'/list-all-musical-genres'} className="side-button">
            All genres
          </Link>
          <Link to={'/add/video'} className="side-button">
            Add video
            <Plus></Plus>
          </Link>
        </div>
      </header>
    );
  }
}
