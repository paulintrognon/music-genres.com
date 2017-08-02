import React from 'react';

import Header from './Header.js';

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
