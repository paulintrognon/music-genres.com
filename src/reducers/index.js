import { combineReducers } from 'redux';

import { routerReducer as router } from 'react-router-redux';
import addTrack from './addTrackReducer';
import searchGenre from './searchGenreReducer';
import musicGenre from './musicGenreReducer';
import player from './playerReducer';

export default combineReducers({
  addTrack,
  musicGenre,
  searchGenre,
  player,
  router,
});
