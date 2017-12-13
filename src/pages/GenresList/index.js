import React from 'react';
import './styles.css';

import { Helmet } from 'react-helmet';

export default class GenresList extends React.Component {
  render() {
    return (
      <div className="genres-list-container">
        <Helmet>
         <title>List of all music Genres</title>
         <meta name="description" content="Musical examples of all musical genres and styles." />
       </Helmet>
       <div className="row">
         <div className="col-6">test</div>
         <div className="col-6">test</div>
       </div>
      </div>
    );
  }
}
