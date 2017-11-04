import React, { Component } from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import Layout from './components/Layout/Layout.js';

import Homepage from './pages/Homepage';
import SearchResults from './pages/SearchResults';
import MusicGenre from './pages/MusicGenre';

import store from './store';
import history from './history';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout>
            <Route path="/" exact={true} component={Homepage}></Route>
            <Route path="/search/:query" exact={true} component={SearchResults}></Route>
            <Route path="/:slug" exact={true} component={MusicGenre}></Route>
          </Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
