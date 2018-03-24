import React from 'react';

import NotFound from '../../components/NotFound';
import { Helmet } from 'react-helmet';


export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
         <title>404 - Music Genres</title>
       </Helmet>
       <NotFound></NotFound>
      </div>
    );
  }
}
