import React from 'react';

import Header from './Header.js';
import './layout.css';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div className="content-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
