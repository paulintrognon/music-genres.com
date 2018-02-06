import React from 'react';

import './layout.css';
import './grid-system.css';
import Header from './Header';
import Footer from './Footer';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div className="content-container">
          {this.props.children}
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
