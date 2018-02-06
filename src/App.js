import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import Layout from './components/Layout/Layout';
import Player from './components/Player';

import AddVideoStep1 from './pages/AddVideoStep1';
import AddVideoToGenre from './pages/AddVideoToGenre';
import Homepage from './pages/Homepage';
import MusicGenre from './pages/MusicGenre';
import SearchResults from './pages/SearchResults';
import GenresList from './pages/GenresList';
import Random from './pages/Random';

import store from './store';
import history from './history';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout>
            <Switch>
              <Route path="/" exact={true} component={Homepage}></Route>
              <Route path="/random-musical-genre" exact={true} component={Random}></Route>
              <Route path="/search/:query" exact={true} component={SearchResults}></Route>
              <Route path="/add/video" exact={true} component={AddVideoStep1}></Route>
              <Route path="/add/video/:genre/:from?" exact={true} component={AddVideoToGenre}></Route>
              <Route path="/list-all-musical-genres" exact={true} component={GenresList}></Route>
              <Route path="/:slug" exact={true} component={MusicGenre}></Route>
            </Switch>
            <Player></Player>
          </Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
