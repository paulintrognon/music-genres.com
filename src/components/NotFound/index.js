import React from 'react';
import { Link } from 'react-router-dom';
import RectangleButton from '../RectangleButton';

import './style.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <hr className="not-found-page__ruler "></hr>
      <p className="not-found-page__404">404</p>
      <p className="not-found-page__subtitle">Sorry, the page you were looking for doesn’t exist.</p>
      <p className="not-found-page__back-button">
        <Link to='/'>
          <RectangleButton>Go back to home</RectangleButton>
        </Link>
      </p>
    </div>
  );
}
